const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = {
  login,
  signup
};

async function signup(req, res, next) {
    return res.status(200).json({
      message: 'Signup successful',
      user: req.user
    });
  }

  async function login(req, res, next) {
    // { session: false }
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('An Error occurred')
          /* res.json({
            message: "User not found"
          }) */
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error)
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { _id: user._id, email: user.email };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user: body }, config.APP_SECRET, { expiresIn: config.JWT_EXPIRY });
          //Send back the token to the user
          return res.json({ token });
        });
      } catch (error) {
        console.log(error)
        return next(error);
      }
    })(req, res, next);
  }