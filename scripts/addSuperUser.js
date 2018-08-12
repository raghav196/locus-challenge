'use strict';

const P = require('bluebird');
const _ = require('lodash');
const uuid = require('uuid');

const userController = require('../controllers/userController');

const addSuperUser = (username, email, password) => {

	return P.try(() => {
		return userController.addUser({
			body: {
				email: email,
				name: username,
				password: password,
				role: 'admin'
			}
		});
	});

};

module.exports = {
	addSuperUser
};