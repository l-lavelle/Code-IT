// TODO: add try/catch with error to all extra calls in auth
const router = require("express").Router();
const {
  Question,
  Language,
  Difficulty,
  User,
  User_Answer,
} = require("../models");

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

// Not Logged In: Get question by lanugage and difficulty
router.get("/reg/:language_id/:difficulty_id", async (req, res) => {
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

// Logged In: Get single question data with user answer
router.get("/log/:question_id", async (req, res) => {
  console.log("new");
  try {
    const questionData = await Question.findOne({
      where: {
        id: req.params.question_id,
      },
      include: [{ model: Language }],
    });
    const userData = await User.findOne({
      where: { username: req.headers.authorization },
    });
    const userAnswerData = await User_Answer.findAll({
      where: {
        user_id: userData.dataValues.id,
        question_id: req.params.question_id,
      },
      // where: { question_id: req.params.question_id },
    });
    console.log(userAnswerData);
    res.status(200).json({ questionData, userAnswerData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single question - populate page with info
router.get("/reg/:question_id", async (req, res) => {
  console.log("hit normal");
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

// If logged in: create or update user answer
router.put("/log/:question_id", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.headers.authorization },
    });
    console.log("userData", userData);
    const questionData = await User_Answer.findOne({
      where: {
        question_id: req.params.question_id,
        user_id: userData.dataValues.id,
      },
    });
    console.log("questionData", questionData);
    if (questionData != null) {
      console.log("update");
      const updatedData = await User_Answer.update(
        { user_work: req.body.user_work, solved: req.body.solved },
        {
          where: {
            id: questionData.dataValues.id,
          },
        }
      );
      res.status(200).json(updatedData);
    } else {
      console.log("create new");
      const dbUserData = await User_Answer.create({
        user_id: userData.dataValues.id,
        question_id: req.params.question_id,
        user_work: req.body.user_work,
        solved: req.body.solved,
      });
      console.log("user_answer created", dbUserData);
      res.status(200).json(dbUserData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
