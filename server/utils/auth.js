const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.AUTH_SECRET;
const expiration = "12h";

module.exports = {
  generateAccessToken: function (username) {
    return jwt.sign(username, secret, { expiresIn: expiration });
  },

  // authMiddleware: function ({ req }) {
  //   let token = req.body.token || req.query.token || req.headers.authorization;

  //   if (req.headers.authorization) {
  //     token = token.split(" ").pop().trim();
  //   }

  //   if (!token) {
  //     return res.sendStatus(401);
  //   }

  //   try {
  //     const { data } = jwt.verify(token, secret, { maxAge: expiration });
  //     req.user = data;
  //   } catch {
  //     console.log("Invalid token");
  //   }

  //   return req;
  // },
};
