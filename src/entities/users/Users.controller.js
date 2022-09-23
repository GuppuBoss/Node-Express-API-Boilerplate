const UserModal = require('./User.model')

module.exports = {
  profile,
  editProfile,
  deleteProfile,
  changePassword
};

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