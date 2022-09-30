const UserModal = require("./User.model");
const multer = require("multer");
const path = require("path");

module.exports = {
  profile,
  editProfile,
  deleteProfile,
  changePassword,
  pictureUpload,
};

async function profile(req, res, next) {
  //We'll just send back the user details and the token
  return res.status(200).json({
    message: "You made it to the secure route",
    user: req.currentUser,
    token: req.query.secret_token,
  });
}

async function editProfile(req, res, next) {
  await UserModal.findOneAndUpdate(
    { _id: req.currentUser._id },
    { $set: { email: req.body.email } },
    { useFindAndModify: false, new: true },
    function (err, doc) {
      if (err) {
        throw err;
      } else {
        updatedUser = {
          _id: doc._id,
          email: doc.email,
        };
        res.status(200).json({
          message: "User updated successfully",
          user: updatedUser,
        });
      }
    }
  );
}

async function deleteProfile(req, res, next) {
  await UserModal.findOneAndUpdate(
    { _id: req.currentUser._id },
    { $set: { isActive: false } },
    { useFindAndModify: false },
    function (err, doc) {
      if (err) {
        throw err;
      } else {
        res.status(200).json({
          message: "User deleted successfully",
        });
      }
    }
  );
}

async function changePassword(req, res, next) {
  await UserModal.findById(req.currentUser._id).then((user) => {
    console.log("USER", user);
    if (user) {
      user.setPassword(req.body.password, function () {
        user.save();
        res.send("Password changes successfully");
      });
    }
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("user_file");

async function pictureUpload(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.send("File uploading error");
    } else {
      console.log('file uploaded in folder "uploads"');
    }
  });
  res.send("File has been uploaded");
}
