const router = require("express").Router();
const { User } = require("../models");
const { generateAccessToken } = require("../utils/auth");

// Signup: Create a User
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    const token = generateAccessToken({ username: req.body.username });
    res.status(200).json({ token, message: "You are now signed up" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
