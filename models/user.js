'use strict';

const P = require('bluebird');
const _ = require('lodash');
const db = require('../db/knex').db;
const debug = require('debug')('LOCUS:models/user');

const addUser = (userObj) => {
	return P.try(() => {
		return db.transaction((trx) => {
			return trx('users').insert(_.omit(userObj, ['role_id']), ['*']).then((userInserted) => {
				return trx('user_role_mappings').insert({
					user_id: userObj.id,
					role_id: userObj.role_id
				}, ['*']);
			});
		});
	});
};


const findUser = (userId, userEmail, userRoleId) => {
	return P.try(() => {

		let query = db('users');

		query = query.where('users.deleted', '=', false);

		if(userId){
			query = query.where('users.id', '=', userId);
		}

		if(userEmail){
			query = query.where('users.email', '=', userEmail);
		}

		return query.select([
			'users.id as user_id',
			'users.name',
			'users.email',
			'users.country_code',
			'users.phone',
			'users.password'
		]);
	}).then((data) => {

		return P.try(() => {

			let userIds = _.map(data, (e) => {
				return e.user_id;
			});

			debug('USER IDS');
			debug(userIds);

			let query = db('user_role_mappings').whereIn('user_id', userIds).innerJoin('roles', function(){
				this.on('user_role_mappings.role_id', '=', 'roles.id');
			});

			query = query.where('user_role_mappings.deleted', '=', false);
			query = query.where('roles.deleted', '=', false);

			if(userRoleId){
				query = query.where('roles.id', '=', userRoleId);
			}

			return query.select([
				'user_role_mappings.user_id',
				'roles.id as role_id',
				'roles.role'
			]);
		}).then((results) => {

			data = _.map(data, (e) => {

				let userRoles = _.filter(results, (ur) => {
					return e.user_id === ur.user_id;
				});

				e.roles = _.map(userRoles, (ur) => {return _.omit(ur, ['user_id'])});
				return e;

			});

			return data;

		});

	});


};

const addRoleToUser = (userId, roleId) => {
	return P.try(() => {
		return db.transaction((trx) => {
			return db('user_role_mappings').select(['*']).where({
				user_id: userId,
				role_id: roleId
			}).then((userRoleMappings) => {
				return P.try(() => {
					if(_.isEmpty(userRoleMappings)){
						//	add role to user
						return trx('user_role_mappings').insert({
							user_id: userId,
							role_id: roleId
						}, ['*']);
					}else{
						//	mappings already exists
						if(userRoleMappings[0].deleted){
							// update the deleted flag;
							return trx('user_role_mappings').update({
								deleted: false
							}, ['*']).where({
								user_id: userId,
								role_id: roleId
							});
						}
					}
				})
			})
		})
	})
};

const removeRoleFromUser = (userId, roleId) => {
	return P.try(() => {
		return db('user_role_mappings').update({
			deleted: true
		}).where({
			user_id: userId,
			role_id: roleId
		});
	});
};

module.exports = {
	addUser,
	findUser,
	addRoleToUser,
	removeRoleFromUser
};