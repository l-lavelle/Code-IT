const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Language extends Model {}

Language.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    language_type: {
      type: DataTypes.STRING,
    },
    // question_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "questions",
    //     key: "id",
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "language",
  }
);

module.exports = Language;
