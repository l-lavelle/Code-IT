const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    question: {
      type: DataTypes.STRING,
    },
    answer: {
      type: DataTypes.STRING,
    },
    hint: {
      type: DataTypes.STRING,
    },
    solution: {
      type: DataTypes.TEXT,
    },
    comment: {
      type: DataTypes.STRING,
    },
    difficulty_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "difficulties",
        key: "id",
      },
    },
    language_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "languages",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "question",
  }
);

module.exports = Question;
