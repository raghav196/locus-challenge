'use strict';

const P = require('bluebird');
const _ = require('lodash');

const userController = require('../controllers/userController');
const permissionController = require('../controllers/permissionController');

const authMiddleware = require('../middlewares/auth');

const validation = require('../utils/validation');
const error = require('../utils/error');

module.exports = (router) => {

	router.post('/users', (req, res) => {
		return P.try(() => {
			if(!validation.USER.registerUser(req.body)){
				throw validation.constructError(validation.USER.registerUser.errors);
			}

			return userController.addUser(req);
		}).then(() => {
			res.status(201).json({
				success: true
			});
		})
	});

	router.post('/users/login', (req, res) => {
		return P.try(() => {
			if(!validation.USER.userLogin(req.body)){
				throw validation.constructError(validation.USER.userLogin.errors);
			}

			return userController.login(req);
		}).then((data) => {
			return res.status(200).json({
				success: true,
				data: data
			});
		});
	});

	// router.get('/users', (req, res) => {
	//
	// });

	router.put('/users/:user_id/roles/:role_id/add', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {
			if(!validation.USER.updateUserRole(req.params)){
				throw validation.constructError(validation.USER.updateUserRole.errors);
			}

			return userController.addRoleToUser(req);
		}).then((data) => {
			return res.status(200).json({
				success: true,
				data: data
			});
		});
	});

	router.put('/users/:user_id/roles/:role_id/remove', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {

			if(!validation.USER.updateUserRole(req.params)){
				throw validation.constructError(validation.USER.updateUserRole.errors);
			}

			return userController.removeRoleFromUser(req);
		}).then((data) => {
			return res.status(200).json({
				success: true,
				data: data
			});
		});
	});

	router.get('/users/access/check', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {
			if(!validation.USER.checkUserAccess(req.query)){
				throw validation.constructError(validation.USER.checkUserAccess.errors);
			}

			return permissionController.checkUserPermission(req);
		}).then((data) => {
			return res.status(200).json({
				success: true,
				data: data
			});
		});
	});

};