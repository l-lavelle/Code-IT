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
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "difficulty",
  }
);

module.exports = Difficulty;
