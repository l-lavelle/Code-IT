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
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "language",
  }
);

module.exports = Language;
