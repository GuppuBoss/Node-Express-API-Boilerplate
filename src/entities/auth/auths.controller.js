const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");
const transport = require("../../utils/mailTrap");
const { UserModel } = require("../users");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const sendResetPasswordEMail = async (email, token, redirectURL) => {
  try {
    const mailOptions = {
      from: '"Haider" <haiderali88g@gmail.com>',
      to: email,
      subject: "For Reset Password",
      html:
        '<p> Hi, This is the link for <a href="http://localhost:7777/api/v1/authenticate/reset-password_token_verification?token=' +
        token +
        "&&redirectURL=" +
        redirectURL +
        '"> reset password</a>',
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message has been sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  } catch (error) {
    throw new Error("Send Mail Function");
  }
};

const securePassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  } catch (error) {
    throw new Error("SecurePassword function error");
  }
};

async function signup(req, res, next) {
  return res.status(200).json({
    message: "Signup successful",
    user: req.user,
  });
}

async function login(req, res, next) {
  // { session: false }
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An Error occurred");
        /* res.json({
            message: "User not found"
          }) */
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id: user._id, email: user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, config.APP_SECRET, {
          expiresIn: config.JWT_EXPIRY,
        });
        //Send back the token to the user
        return res.json({ token });
      });
    } catch (error) {
      console.error("Auth log in error", error);
      return next(error);
    }
  })(req, res, next);
}

const forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const redirectURL = req.body.redirectUrl;
    const userData = await UserModel.findOne({ email: email });
    if (userData) {
      const randomString = randomstring.generate();
      const data = await UserModel.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );
      sendResetPasswordEMail(userData.email, randomString, redirectURL);
      res
        .status(200)
        .send({ success: true, message: "Please check your Email" });
    } else {
      res.status(400).json({
        success: false,
        message: "Email does not exists",
      });
    }
  } catch (error) {
    console.error("Auth forget password error", error);
    res.status(500).json({
      success: false,
      message: "Yhn hai error forget ma",
    });
  }
};

const resetPasswordTokenVerification = async (req, res) => {
  try {
    const token = req.query.token;
    console.log("token", token);
    const redirectURL = req.query.redirectURL;
    const tokenData = await UserModel.findOne({ token: token });
    if (tokenData) {
      res.redirect(redirectURL);
    } else {
      res.status(400).json({
        success: false,
        message: "This token has been expired",
      });
    }
  } catch (error) {
    console.error("Auth reset password token verification error", error);
    res.status(500).json({
      success: false,
      message: ("Error in resetPasswordTokenVerification API", error.message),
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    console.log("token", token);
    const tokenData = await UserModel.findOne({ token: token });
    if (tokenData) {
      const password = req.body.password;
      console.log("Password", password);
      const newPassword = await securePassword(password);
      const userData = await UserModel.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Password has been reset",
        data: userData,
      });
    }
  } catch (error) {
    console.error("Auth reset password error", error);
    res.status(500).json({
      success: false,
      message: ("Error in resetPassword API", error.message),
    });
  }
};

module.exports = {
  login,
  signup,
  forgetPassword,
  resetPasswordTokenVerification,
  resetPassword,
};
