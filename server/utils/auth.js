const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.AUTH_SECRET;
const expiration = "12h";

module.exports = {
  generateAccessToken: function (username) {
    return jwt.sign(username, secret, { expiresIn: expiration });
  },
};
