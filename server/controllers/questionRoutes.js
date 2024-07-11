// TODO: finish routes with auth
const router = require("express").Router();
const {
  Question,
  Language,
  Difficulty,
  User,
  User_Answer,
} = require("../models");
const { authMiddleware } = require("../utils/auth");

// Logged In: Get Question by Language and Difficulty
router.get("/log/:language_id/:difficulty_id", async (req, res) => {
  try {
    const questionData = await Question.findAll({
      include: [
        { model: Language, where: { id: req.params.language_id } },
        { model: Difficulty, where: { id: req.params.difficulty_id } },
      ],
    });
    console.log("questiondata", questionData);

    const userData = await User.findOne({
      where: { username: req.headers.authorization },
    });
    const userAnswerData = await User_Answer.findAll({
      where: { user_id: userData.dataValues.id },
    });
    res.status(200).json({ questionData, userAnswerData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Not Logged In get question by lanugage and difficulty
router.get("/:language_id/:difficulty_id", async (req, res) => {
  try {
    const questionData = await Question.findAll({
      include: [
        { model: Language, where: { id: req.params.language_id } },
        { model: Difficulty, where: { id: req.params.difficulty_id } },
      ],
    });
    res.status(200).json(questionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Languages
router.get("/languages", async (req, res) => {
  try {
    const languageData = await Language.findAll();
    res.status(200).json(languageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Difficulties
router.get("/difficulty", async (req, res) => {
  try {
    const difficultyData = await Difficulty.findAll();
    res.status(200).json(difficultyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single question - populate page with info
router.get("/:question_id", async (req, res) => {
  // if authincated grab saved answer
  try {
    const questionData = await Question.findOne({
      where: {
        id: req.params.question_id,
      },
      include: [{ model: Language }],
    });
    res.status(200).json(questionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Try to see if question is correct and update user answer if authenciated
router.post("/:question_id", async (req, res) => {
  // if authincated change boolean for solved
  try {
    const questionData = await Question.findOne({
      where: {
        id: req.params.question_id,
      },
    });
    if (!questionData) {
      res.status(400).json({ message: "Question does not exist" });
      return;
    }
    if (questionData.dataValues.answer === req.body.answer) {
      res.status(200).json(questionData);
    } else {
      res.status(200).json({ message: "Your Answer is Incorrect" });
    }
    // console.log(questionData.dataValues.answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
