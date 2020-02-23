const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { catchErrors } = require('../helpers');

// USER ROUTES
router.get('/user/profile', catchErrors(UserController.profile));

module.exports = router;
