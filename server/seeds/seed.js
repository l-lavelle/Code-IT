const sequelize = require("../config/connection");
const { User, Language, Difficulty, Question } = require("../models");

const userData = require("./userSeeds.json");
const languageData = require("./languageSeeds.json");
const difficultyData = require("./difficultySeeds.json");
const questionData = require("./questionSeeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, { individualHooks: true });

  await Language.bulkCreate(languageData);

  await Difficulty.bulkCreate(difficultyData);

  await Question.bulkCreate(questionData);

  process.exit(0);
};

seedDatabase();
