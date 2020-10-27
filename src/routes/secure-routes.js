const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { catchErrors } = require('../helpers');

// USER ROUTES
router.get('/user/profile', catchErrors(UserController.profile));
router.put("/user/profile", catchErrors(UserController.editProfile))
router.delete("/user/profile", catchErrors(UserController.deleteProfile))
router.post("/user/profile", catchErrors(UserController.changePassword))

module.exports = router;
