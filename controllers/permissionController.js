'use strict';

const P = require('bluebird');
const _ = require('lodash');

const Permission = require('../models/permission');
const error = require('../utils/error');

const checkUserPermission = (req) => {
	return P.try(() => {

		// const roles = _.map(req.user.roles, (r) => {
		// 	return r.role_id;
		// });

		return Permission.checkAccessForUserAndResource(req.user.roles[0].role_id, req.query.resource, req.query.access_level);
	}).then((userPermissions) => {
		if(_.isEmpty(userPermissions)){
			throw error._401('Unauthorised. No access level permission found for this role/resource');
		}

		if(userPermissions[0].grant){
			return {user_access: true};
		}else{
			return {user_access: false};
		}
	});
};

module.exports = {
	checkUserPermission
};