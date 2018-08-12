'use strict';

const registerUser = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		},
		email: {
			type: 'string',
			format: 'email'
		},
		role: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		},
		password: {
			type: 'string',
			minLength: 8,
			maxLength: 64
		},
		country_code: {
			type: 'string',
			minLength: 2,
			maxLength: 3
		},
		phone: {
			type: 'string',
			minLength: 10,
			maxLength: 10
		}
	},
	additionalProperties: false,
	required: ['name', 'email', 'password', 'role']
};

const userLogin = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			format: 'email'
		},
		role: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		},
		password: {
			type: 'string',
			minLength: 1
		}
	},
	additionalProperties: false,
	required: ['email', 'password', 'role']
};

const updateUserRole = {
	type: 'object',
	properties: {
		role_id: {
			type: 'integer',
			minimum: 1
		},
		user_id: {
			type: 'string',
			format: 'uuid'
		}
	},
	additionalProperties: false,
	required: ['role_id', 'user_id']
};

const checkUserAccess = {
	type: 'object',
	properties: {
		resource: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		},
		access_level: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		}
	},
	additionalProperties: false,
	required: ['resource', 'access_level']
};

module.exports = {
	registerUser: registerUser,
	userLogin: userLogin,
	updateUserRole: updateUserRole,
	checkUserAccess: checkUserAccess
};