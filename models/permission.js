'use strict';

const P = require('bluebird');
const _ = require('lodash');
const db = require('../db/knex').db;

const error = require('../utils/error');

const checkAccessForUserAndResource = (roleId, resource, accessLevel) => {
	return P.try(() => {
		return db('permissions').select(['*']).where({
			role_id: roleId,
			resource: resource,
			access_level: accessLevel
		});
	}).then((accesses) => {
		return accesses;
	});
};

module.exports = {
	checkAccessForUserAndResource
};