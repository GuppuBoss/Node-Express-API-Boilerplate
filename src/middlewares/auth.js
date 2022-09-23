const passport = require('passport');
const UserModel = require('../entities/users/User.model')
/**
 * middleware for checking authorization with jwt
 */
exports.jwtAuthorize = async(req, res, next) => {
    passport.authenticate('jwt', { session: true, }, async(error, User) => {
        console.log('passport.authenticate', JSON.stringify(User));
        if (error || !User) {
            console.log('JWT error', error);
            res.status(401).json({ message: 'Unauthorized' });
            return false;
        }
        req.currentUser = User
        //req.someEntity = EntityData;
        next();
    })(req, res, next);
}