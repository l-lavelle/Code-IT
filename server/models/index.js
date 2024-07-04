const User = require("./User");
const Question = require("./Question");
const Difficulty = require("./Difficulty");
const Language = require("./Language");
const User_Answer = require("./User_Answer");

// Question have one difficulty
Question.belongsTo(Difficulty, {
  foreignKey: "question_id",
});

// Difficulty belongs to many Questions
Difficulty.hasMany(Question, {
  foreignKey: "question_id",
  onDelete: "CASCADE",
});

// Question have one Language
Question.belongsTo(Language, {
  foreignKey: "question_id",
});

// Languages belongs to many Questions
Language.hasMany(Question, {
  foreignKey: "question_id",
  onDelete: "CASCADE",
});

// Answers belong to one user
User_Answer.belongsTo(User, {
  foreignKey: "user_id",
});

// User has many Answers
User.hasMany(User_Answer, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Answer belongs to one question
User_Answer.belongsTo(Question, {
  foreignKey: "question_id",
});

// Questions has many Answers
Question.hasMany(User_Answer, {
  foreignKey: "question_id",
  onDelete: "CASCADE",
});

module.exports = { User, Question, Difficulty, Language, User_Answer };
