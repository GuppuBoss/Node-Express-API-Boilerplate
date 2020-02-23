const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// middleware packages to allow access to routes with Valid jwt tokens 
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { DeviceMapService } = require('../services');
const config = require('../config/config');
const CONSTANTS = require('../helpers/constants');

passport.use('login', new LocalStrategy({
        usernameField: 'device_id', // these keys are coming from req.body object method login
        passwordField: 'key',
        // passReqToCallback: true,
        session: false,
    },
    function(device_id, key, cb) {
        let result = DeviceMapService.verifyDevice(device_id, key).then(device => {
            if (!!device) {
                return cb(null, device, { message: CONSTANTS.MESSAGES.SUCCESS.DEVICE_FOUND });
            } else {
                return cb(null, false, { message: CONSTANTS.MESSAGES.ERROR.DEVICE_NOT_FOUND });
            }
        }).catch(error => {
            console.error('Passport Login Strategy', error);
            cb(error);
        });
        return result;
    }
));

// JWT request middleware
passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.APP_SECRET
    },
    function(jwtPayload, cb) {
        // when authenticating with jwt it first comes here. then go in
        // middleware/auth.js
        return cb(null, jwtPayload)
    }
));