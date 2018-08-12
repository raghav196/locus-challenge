'use strict';

const P = require('bluebird');
const _ = require('lodash');

const Role = require('../models/role');

const getRoles = () => {
	return P.try(() => {
		return Role.getRoles();
	}).then((data) => {
		return { roles: data };
	});
};

module.exports = {
	getRoles
};