const router = require("express").Router();
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes");
const questionRoutes = require("./questionRoutes");

router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/question", questionRoutes);

module.exports = router;
