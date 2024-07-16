const router = require("express").Router();
const { User_Code, User } = require("../models");

// Create new code block
router.post("/", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.headers.authorization },
    });
    console.log("userData", userData);
    const codeBlockData = await User_Code.create({
      user_id: userData.dataValues.id,
      language: req.body.language,
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
    });
    console.log("user code block was created", codeBlockData);
    res.status(200).json(codeBlockData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all of the code blocks for a specific user
router.get("/", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.headers.authorization },
    });
    console.log("userData", userData);
    const codeBlockData = await User_Code.findAll({
      where: { user_id: userData.dataValues.id },
    });
    res.status(200).json(codeBlockData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one code blocks for a specific user
router.get("/:usercode_id", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.headers.authorization },
    });
    console.log("userData", userData);
    const codeBlockData = await User_Code.findOne({
      where: { user_id: userData.dataValues.id, id: req.params.usercode_id },
    });
    res.status(200).json(codeBlockData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a code block
router.put("/:usercode_id ", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.headers.authorization },
    });
    console.log("userData", userData);

    const updatedCodeBlock = await User_Code.update(
      {
        title: req.body.title,
        description: req.body.description,
        language_id: req.body.language_id,
        code: req.body.code,
      },
      {
        where: {
          user_id: userData.dataValues.id,
          id: req.params.usercode_id,
        },
      }
    );
    res.status(200).json(updatedCodeBlock);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a code block
router.delete("/:id", async (req, res) => {
  console.log("trial", req.params.id);
  try {
    await User_Code.destroy({
      where: {
        id: req.params.id,
      },
    });
    const userData = await User.findOne({
      where: { username: req.headers.authorization },
    });
    const codeBlockData = await User_Code.findAll({
      where: { user_id: userData.dataValues.id },
    });
    res.status(200).json(codeBlockData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
