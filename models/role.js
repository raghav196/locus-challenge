'use strict';

const P = require('bluebird');
const db = require('../db/knex').db;
const debug = require('debug')('LOCUS:models/role');

const getRoles = () => {
	return P.try(() => {
		return db('roles').select(['id', 'role', 'created_at', 'updated_at']).where({
			deleted: false
		});
	});
};

const getRoleById = (role_id) => {
	return P.try(() => {
		return db('roles').select(['*']).where({
			id: role_id,
			deleted: false
		});
	});
};

const getRoleByName = (role) => {
	return P.try(() => {
		return db('roles').select(['*']).where({
			role: role,
			deleted: false
		});
	});
};

module.exports = {
	getRoles,
	getRoleById,
	getRoleByName
};
