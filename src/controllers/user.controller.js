const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const UserModal = require("../models/user.model")

module.exports = {
  login,
  signup,
  profile,
  editProfile,
  deleteProfile,
  changePassword
};

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

async function signup(req, res, next) {
  return res.status(200).json({
    message: 'Signup successful',
    user: req.user
  });
}

async function profile(req, res, next) {
  //We'll just send back the user details and the token
  return res.status(200).json({
    message: 'You made it to the secure route',
    user: req.currentUser,
    token: req.query.secret_token
  });
}

async function editProfile(req, res, next){
  await UserModal.findOneAndUpdate({_id: req.currentUser._id}, {$set: {email: req.body.email}}, {useFindAndModify: false, new: true}, function(err,doc) {
    if (err) { throw err; }
    else { 
      updatedUser = {
        _id: doc._id,
        email: doc.email
      }
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
      })
     }
  })
}

async function deleteProfile(req, res, next){
  await UserModal.findOneAndUpdate({_id: req.currentUser._id}, {$set: {isActive: false}}, {useFindAndModify: false}, function(err,doc) {
    if (err) { throw err; }
    else {
      res.status(200).json({
        message: "User deleted successfully"
      })
     }
  })
}

async function changePassword(req, res, next){
  await UserModal.findById(req.currentUser._id).then(user => {
    console.log("USER", user)
    if(user){
      user.setPassword(req.body.password, function(){
        user.save()
        res.send("Password changes successfully")
      })
    }
  })
}