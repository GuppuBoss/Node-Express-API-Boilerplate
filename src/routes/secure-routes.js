const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { catchErrors } = require('../helpers');

// USER ROUTES
router.get('/profile', catchErrors(UserController.profile));

router.put('/update/:id', catchErrors(UserController.update));

module.exports = router;
