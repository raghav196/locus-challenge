'use strict';

const P = require('bluebird');
const argon = require('argon2');
const jwt = P.promisifyAll(require('jsonwebtoken'));
const debug = require('debug')('LOCUS:utils/auth');

const config = require('../configs/config');

const hashPassword = (password) => {
	return P.try(() => {
		return argon.hash(password);
	});
};

const verifyPassword = (hashedPassword, plainPassword) => {
	return P.try(() => {
		debug(hashedPassword, plainPassword);
		return argon.verify(hashedPassword, plainPassword);
	})
};


const generateToken = (payload, expiresIn = '7d') => {
	return P.try(() => {
		return jwt.signAsync(payload, config.JWT.SECRET, {
			expiresIn: expiresIn,
			algorithm: config.JWT.ALGORITHM,
			issuer: config.JWT.ISSUER
		});
	}).then((token) => {
		return P.try(() => {
			return jwt.decode(token);
		}).then((decoded) => {
			return {
				token: token,
				issued_at: decoded.iat,
				expires_at: decoded.exp
			};
		});
	});
};

const verifyToken = (token) => {
	return P.try(() => {
		return jwt.verifyAsync(token, config.JWT.SECRET, {
			algorithms: [config.JWT.ALGORITHM],
			issuer: config.JWT.ISSUER
		});
	});
};


module.exports = {
	hashPassword: hashPassword,
	verifyPassword: verifyPassword,
	generateToken: generateToken,
	verifyToken: verifyToken
};
