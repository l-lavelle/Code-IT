const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User_Answer extends Model {}

User_Answer.init(
  {
    solved: {
      type: DataTypes.BOOLEAN,
    },
    user_work: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
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
    modelName: "user_answer",
  }
);

module.exports = User_Answer;
