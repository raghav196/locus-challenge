'use strict';

const config = {
	NODE_ENV: process.env.NODE_ENV || 'dev',
	DATABASE: {
		HOST: process.env.DATABASE_HOST || '127.0.0.1',
		PORT: process.env.DATABASE_PORT || 5432,
		USER: process.env.DATABASE_USER || 'raghav',
		PASSWORD: process.env.DATABASE_PASSWORD || '',
		DATABASE: process.env.DATABASE_NAME || 'locus'
	},
	APP: {
		HOST: process.env.APP_HOST || 'http://localhost:4030',
		PORT: process.env.APP_PORT || 4030,
	},
	JWT: {
		SECRET: process.env.JWT_SECRET || 'whatsmysecret',
		ALGORITHM: 'HS256',
		ISSUER: 'locus-auth'
	}
};

module.exports = config;
