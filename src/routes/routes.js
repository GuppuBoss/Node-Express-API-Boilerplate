const express = require("express");
const router = express.Router();
const { catchErrors } = require("../helpers");
const { AuthController } = require("../entities/auth");
const passport = require("passport");

const authRoutes = {
  LOGIN: "/authenticate/login",
  SIGN_UP: "/authenticate/sign-up",
  FORGET_PASSWORD: "/authenticate/forget-password",
  RESET_PASSWORD: "/authenticate/reset-password",
};

router.post(authRoutes.LOGIN, catchErrors(AuthController.login));
// When the user sends a post request to this route, passport authenticates the user based on the
// middleware created previously
router.post(
  authRoutes.SIGN_UP,
  passport.authenticate("signup", { session: false }),
  catchErrors(AuthController.signup)
);

module.exports = router;
