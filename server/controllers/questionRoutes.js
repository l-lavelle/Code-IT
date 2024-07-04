const router = require("express").Router();
const { Question, Language, Difficulty } = require("../models");

// Get Question by Language and Difficulty
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
module.exports = router;
