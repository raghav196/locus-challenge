'use strict';

const P = require('bluebird');
const _ = require('lodash');
const uuid = require('uuid');
const debug = require('debug')('LOCUS:controllers/user');

const Role = require('../models/role');
const User = require('../models/user');

const authUtil = require('../utils/auth');
const error = require('../utils/error');


const addUser = (req) => {
	return P.try(() => {
		debug('REQ.BODY');
		debug(req.body);

		return Role.getRoleByName(req.body.role);
	}).then((role) => {
		debug('ROLE');
		debug(role);

		if(_.isEmpty(role)){
			throw error._404(`Role '${req.body.role}' not found.`);
		}

		return P.try(() => {
			return User.findUser(null, req.body.email, role[0].id);
		}).then((userWithRole) => {

			if(_.filter(userWithRole, (e) => {
				return e.role_id === role[0].id;
				}).length > 0){
				throw error._409(`User with role ${req.body.role} already exists.`);
			}

			const user = {
				id: uuid.v4(),
				name: req.body.name,
				email: req.body.email
			};

			if(req.body.country_code){
				user.country_code = req.body.country_code;
			}
			if(req.body.phone){
				user.phone = req.body.phone;
			}

			user.role_id = role[0].id;

			return P.try(() => {
				return authUtil.hashPassword(req.body.password);
			}).then((userHasedPassword) => {

				user.password = userHasedPassword;
				return user;

			});

		}).then((user) => {

			return User.addUser(user);

		});
	});
};



const login = (req) => {
	return P.try(() => {
		return Role.getRoleByName(req.body.role);
	}).then((role) => {
		if(_.isEmpty(role)){
			throw error._400('Please select a valid role');
		}

		const ROLE_ID = role[0].id;
		return User.findUser(null, req.body.email, ROLE_ID);
	}).then((user) => {

		debug('USER');
		debug(user);

		if(_.isEmpty(user)){
			throw error._404('User does not exists/invalid role');
		}

		debug('USER PASSWORD');
		debug(user[0].password);
		debug(req.body.password);
		return P.try(() => {
			return authUtil.verifyPassword(user[0].password, req.body.password);
		}).then((match) => {
			debug('MATCH');
			debug(match);
			if(!match){
				throw error._401('Wrong Password');
			}

			let userLoginRole = _.filter(user[0].roles, (e) => { return e.role === req.body.role });

			const payload = {
				user_id: user[0].user_id,
				email: user[0].email,
				roles: [
					{
						role_id: userLoginRole[0].role_id,
						role: req.body.role
					}
				]
			};
			return authUtil.generateToken(payload);
		}).then((userToken) => {
			if(userToken){
				user[0].token = userToken.token;
				user[0].issued_at = userToken.issued_at;
				user[0].expires_at = userToken.expires_at;
			}

			return {
				user: _.omit(user[0], ['password'])
			};
		})

	})
};


const addRoleToUser = (req) => {
	return P.try(() => {
		return P.all([
			User.findUser(req.params.user_id),
			Role.getRoleById(req.params.role_id)
		]);

	}).then((results) => {

		let user = results[0];
		let role = results[1];

		if(_.isEmpty(user)){
			throw error._404('User not found');
		}

		if(_.isEmpty(role)){
			throw error._404('Role not found');
		}

		if(_.filter(user[0].roles, (e) => {
			return e.role_id === req.params.role_id
			}).length > 0){
			throw error._409('Role already exists for the user');
		}

		return User.addRoleToUser(req.params.user_id, req.params.role_id);
	}).then(() => {
		return User.findUser(req.params.user_id);
	}).then((userData) => {
		return { user: _.omit(userData[0], ['password']) };
	})
};


const removeRoleFromUser = (req) => {
	return P.try(() => {
		return P.all([
			User.findUser(req.params.user_id),
			Role.getRoleById(req.params.role_id)
		]);

	}).then((results) => {

		let user = results[0];
		let role = results[1];

		if(_.isEmpty(user)){
			throw error._404('User not found');
		}

		if(_.isEmpty(role)){
			throw error._404('Role not found');
		}

		if(user[0].roles.length === 1 && _.filter(user[0].roles, (e) => { return e.role_id === req.params.role_id}).length > 0){
			throw error._400('Role cannot be deleted. As the user has only this role');
		}

		return User.removeRoleFromUser(req.params.user_id, req.params.role_id);
	}).then(() => {
		return User.findUser(req.params.user_id);
	}).then((userData) => {
		return { user: _.omit(userData[0], ['password']) };
	})
};

module.exports = {
	addUser: addUser,
	login: login,
	addRoleToUser,
	removeRoleFromUser
};