'use strict';

const _ = require('lodash');
const constants = require('../configs/constants');
const Role = require('../models/role');

exports.seed = function(knex, Promise) {
  return Promise.try(() => {
    return knex('permissions').del();
  }).then(() => {
	  return Role.getRoles();
  }).then((roles) => {

    const admin = _.filter(roles, (e) => { return e.role === constants.ROLES.ADMIN });
    console.log(admin);
		const moderator = _.filter(roles, (e) => { return e.role === constants.ROLES.MODERATOR });
		const user = _.filter(roles, (e) => { return e.role === constants.ROLES.USER });

		let permissions = [
			// admin permissions
		  {
        role_id: admin[0].id,
        resource: constants.RESOURCES.USER,
        access_level: constants.ACTION_TYPES.READ,
        grant: true
      },
			{
				role_id: admin[0].id,
				resource: constants.RESOURCES.USER,
				access_level: constants.ACTION_TYPES.WRITE,
				grant: true
			},
			{
				role_id: admin[0].id,
				resource: constants.RESOURCES.USER,
				access_level: constants.ACTION_TYPES.DELETE,
				grant: true
			},
			{
				role_id: admin[0].id,
				resource: constants.RESOURCES.PAYMENTS,
				access_level: constants.ACTION_TYPES.READ,
				grant: true
			},
			{
				role_id: admin[0].id,
				resource: constants.RESOURCES.PAYMENTS,
				access_level: constants.ACTION_TYPES.WRITE,
				grant: true
			},
			{
				role_id: admin[0].id,
				resource: constants.RESOURCES.PAYMENTS,
				access_level: constants.ACTION_TYPES.DELETE,
				grant: true
			},
			{
				role_id: admin[0].id,
				resource: constants.RESOURCES.CASES,
				access_level: constants.ACTION_TYPES.READ,
				grant: true
			},
			{
				role_id: admin[0].id,
				resource: constants.RESOURCES.CASES,
				access_level: constants.ACTION_TYPES.WRITE,
				grant: true
			},
			{
				role_id: admin[0].id,
				resource: constants.RESOURCES.CASES,
				access_level: constants.ACTION_TYPES.DELETE,
				grant: true
			},

      // moderator permissions
			{
				role_id: moderator[0].id,
				resource: constants.RESOURCES.USER,
				access_level: constants.ACTION_TYPES.READ,
				grant: false
			},
			{
				role_id: moderator[0].id,
				resource: constants.RESOURCES.USER,
				access_level: constants.ACTION_TYPES.WRITE,
				grant: false
			},
			{
				role_id: moderator[0].id,
				resource: constants.RESOURCES.USER,
				access_level: constants.ACTION_TYPES.DELETE,
				grant: false
			},
			{
				role_id: moderator[0].id,
				resource: constants.RESOURCES.PAYMENTS,
				access_level: constants.ACTION_TYPES.READ,
				grant: true
			},
			{
				role_id: moderator[0].id,
				resource: constants.RESOURCES.PAYMENTS,
				access_level: constants.ACTION_TYPES.WRITE,
				grant: true
			},
			{
				role_id: moderator[0].id,
				resource: constants.RESOURCES.PAYMENTS,
				access_level: constants.ACTION_TYPES.DELETE,
				grant: true
			},
			{
				role_id: moderator[0].id,
				resource: constants.RESOURCES.CASES,
				access_level: constants.ACTION_TYPES.READ,
				grant: true
			},
			{
				role_id: moderator[0].id,
				resource: constants.RESOURCES.CASES,
				access_level: constants.ACTION_TYPES.WRITE,
				grant: true
			},
			{
				role_id: moderator[0].id,
				resource: constants.RESOURCES.CASES,
				access_level: constants.ACTION_TYPES.DELETE,
				grant: true
			},

			// user permission
			{
				role_id: user[0].id,
				resource: constants.RESOURCES.USER,
				access_level: constants.ACTION_TYPES.READ,
				grant: false
			},
			{
				role_id: user[0].id,
				resource: constants.RESOURCES.USER,
				access_level: constants.ACTION_TYPES.WRITE,
				grant: false
			},
			{
				role_id: user[0].id,
				resource: constants.RESOURCES.USER,
				access_level: constants.ACTION_TYPES.DELETE,
				grant: false
			},
			{
				role_id: user[0].id,
				resource: constants.RESOURCES.PAYMENTS,
				access_level: constants.ACTION_TYPES.READ,
				grant: true
			},
			{
				role_id: user[0].id,
				resource: constants.RESOURCES.PAYMENTS,
				access_level: constants.ACTION_TYPES.WRITE,
				grant: true
			},
			{
				role_id: user[0].id,
				resource: constants.RESOURCES.PAYMENTS,
				access_level: constants.ACTION_TYPES.DELETE,
				grant: false
			},
			{
				role_id: user[0].id,
				resource: constants.RESOURCES.CASES,
				access_level: constants.ACTION_TYPES.READ,
				grant: false
			},
			{
				role_id: user[0].id,
				resource: constants.RESOURCES.CASES,
				access_level: constants.ACTION_TYPES.WRITE,
				grant: false
			},
			{
				role_id: user[0].id,
				resource: constants.RESOURCES.CASES,
				access_level: constants.ACTION_TYPES.DELETE,
				grant: false
			},

    ];

    return knex('permissions').insert(permissions);

  })
};
