'use strict';

const P = require('bluebird');
const authUtil = require('../utils/auth');

const error = require('../utils/error');

exports.verifyToken = (req, res, next) => {
	return P.try(() => {
		if(!req.headers['authorization']){
			throw error._400('Authorization Header missing');
		}

		return authUtil.verifyToken(req.headers['authorization']);
	}).then((user) => {
		if(user){
			req.user = user;
			return next();
		}else{
			throw error._401('Token invalid/expired');
		}
	})
};
