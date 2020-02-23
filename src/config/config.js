const config = {
    ENVIORMENT: process.env.ENVIRONMENT,
    MONGO_URI: process.env.DATABASE,
    PORT: process.env.SERVER_PORT,
    APP_SECRET: process.env.SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    EMAIL: {
        smtp: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    },
};
console.log("App Running Environment ENVIORMENT ☛", config.ENVIORMENT);
console.log("JWT EXPIRY", process.env.JWT_EXPIRY);
module.exports = config;
