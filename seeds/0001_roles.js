'use strict';

const _ = require('lodash');
const constants = require('../configs/constants');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.try(() => {
    return knex('roles').del();
  }).then(() => {
    const roles = _.map(constants.ROLES, (e) => {
      return {role: e};
    });

    return knex('roles').insert(roles, ['*']);
  });

};
