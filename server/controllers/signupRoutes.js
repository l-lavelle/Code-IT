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
    console.log(dbUserData);
    let username = req.body.username;
    console.log(username);
    const token = generateAccessToken({ username: req.body.username });
    console.log(token);
    // res.json(token);
    res.status(200).json({ dbUserData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Testing Route
router.get("/", async (req, res) => {
  try {
    const locationData = await User.findAll();
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
