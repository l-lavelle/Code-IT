const router = require("express").Router();
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes");
const questionRoutes = require("./questionRoutes");
const codeBlockRoutes = require("./codeBlockRoutes");

router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/question", questionRoutes);
router.use("/codeBlock", codeBlockRoutes);

module.exports = router;
