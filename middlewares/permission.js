'use strict';

const P = require('bluebird');
const permissionController = require('../controllers/permissionController');
const error = require('../utils/error');

const checkUserPermission = (req, res, next) => {
	return P.try(() => {
		return permissionController.checkUserPermission(req);
	}).then((permission) => {
		if(permission){
			return next();
		}else{
			throw error._401('Unauthorised for this action.');
		}
	});
};

module.exports = {
	checkUserPermission
};
