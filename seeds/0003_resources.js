'use strict';

const _ = require('lodash');
const constants = require('../configs/constants');

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return Promise.try(() => {
		return knex('resources').del();
	}).then(() => {
		const resources = _.map(constants.RESOURCES, (e) => {
			return {resource: e};
		});

		return knex('resources').insert(resources, ['*']);
	});

};
