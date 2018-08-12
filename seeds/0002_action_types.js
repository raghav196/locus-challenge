'use strict';

const _ = require('lodash');
const constants = require('../configs/constants');

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return Promise.try(() => {
		return knex('action_types').del();
	}).then(() => {
		const accessLevels = _.map(constants.ACTION_TYPES, (e) => {
			return {access_level: e};
		});

		return knex('action_types').insert(accessLevels, ['*']);
	});

};
