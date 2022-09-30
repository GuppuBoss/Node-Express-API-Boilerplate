const config = require("../config");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: config.SMTP.host,
  port: config.SMTP.port,
  auth: {
    user: config.SMTP.user,
    pass: config.SMTP.pass,
  },
});

module.exports = transport;