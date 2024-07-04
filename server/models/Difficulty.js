const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Difficulty extends Model {}

Difficulty.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    difficulty_type: {
      type: DataTypes.STRING,
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "questions",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "difficulty",
  }
);

module.exports = Difficulty;
