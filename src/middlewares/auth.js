const passport = require('passport');
/**
 * middleware for checking authorization with jwt
 */
exports.jwtAuthorize = async(req, res, next) => {
    passport.authenticate('jwt', { session: false, }, async(error, User) => {
        console.log('passport.authenticate', JSON.stringify(User));
        if (error || !User) {
            console.log('JWT error', error);
            res.status(401).json({ message: 'Unauthorized' });
            return false;
        }
        //req.someEntity = EntityData;
        next();
    })(req, res, next);
}