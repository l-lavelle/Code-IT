const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.AUTH_SECRET;
const expiration = "12h";

module.exports = {
  // function generateAccessToken(username) {
  //   return jwt.sign(username, secret, { expiration });
  // }
  //   generateAccessToken: function (username) {
  //     return jwt.sign({ data: username }, secret, { expiresIn: expiration });
  //   },
  generateAccessToken: function (username) {
    return jwt.sign(username, secret, { expiresIn: expiration });
  },
};
