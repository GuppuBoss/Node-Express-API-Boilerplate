const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
// middleware packages to allow access to routes with Valid jwt tokens
const passportJWT = require("passport-jwt");
const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { UserModel } = require("../users");
const config = require("../../config");
//Create a passport middleware to handle user registration
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // check if the user email already exists
        const emailExists = await UserModel.findOne({ email });
        if (emailExists) {
          throw new Error("email already exists");
        }
        //Save the information provided by the user to the the database
        const user = await UserModel.create({ email, password });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Create a passport middleware to handle User login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        //Find the user associated with the email provided by the user
        
        const user = await UserModel.findOne({
          email,
          isActive: { $ne: false },
        });

        if (!user) {
          //If the user isn't found in the database, return a message
          return done(null, false, { message: "User not found" });
        }
        console.log("USER", user);
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        //Send the user information to the next middleware
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        console.error("Passport Login", error);
        return done(error);
      }
    }
  )
);

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: config.APP_SECRET,
      //we expect the user to send the token as a query parameter with the name 'secret_token'
      //jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token') for query parameters
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // for bearer token
    },
    async (token, done) => {
      try {
        //Pass the user details to the next middleware
        return done(null, token.user);
      } catch (error) {
        console.log("ERROR of JWT in Passport", error);
        done(error);
      }
    }
  )
);
