'use strict';

const P = require('bluebird');
const _ = require('lodash');

const roleController = require('../controllers/roleController');

const authMiddleware = require('../middlewares/auth');

const validation = require('../utils/validation');
const error = require('../utils/error');

module.exports = (router) => {

	router.get('/roles', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {
			return roleController.getRoles();
		}).then((data) => {
			return res.status(200).json({
				success: true,
				data: data
			});
		});
	});

};