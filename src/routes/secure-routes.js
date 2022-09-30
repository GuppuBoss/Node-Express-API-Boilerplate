const express = require('express');
const router = express.Router();
const { catchErrors } = require('../helpers');
const UsersController = require('../entities/users/Users.Controller')

// USER ROUTES
router.get('/users/me', catchErrors(UsersController.profile));
router.put("/users/update/:id", catchErrors(UsersController.editProfile))
router.delete("/users/:id", catchErrors(UsersController.deleteProfile))
router.post("/users/changePassword", catchErrors(UsersController.changePassword))
router.post("/users/pictureUpload", catchErrors(UsersController.pictureUpload))

module.exports = router;
