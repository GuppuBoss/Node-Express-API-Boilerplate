const express = require('express');
const router = express.Router();
const { catchErrors } = require('../helpers');
const UserController = require('../controllers/user.controller');
const passport = require('passport');

// USER ROUTES
router.post('/user/login', catchErrors(UserController.login));
//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/user/signup', passport.authenticate('signup', { session : false }) , catchErrors(UserController.signup));

module.exports = router;
