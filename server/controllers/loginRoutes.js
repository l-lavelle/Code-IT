const router = require("express").Router();
const { User } = require("../models");

router.post("/", async (req, res) => {
  console.log("hitting login endpoint");
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!dbUserData) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    // req.session.save(() => {
    //   req.session.loggedIn = true;
    //   req.session.userId = dbUserData.id;
    res
      .status(200)
      .json({ user: dbUserData, message: "You are now logged in!" });
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  // if (req.session.loggedIn) {
  //   req.session.destroy(() => {
  //     res.status(204).end();
  //   });
  // } else {
  //   res.status(404).end();
  // }
});
module.exports = router;
