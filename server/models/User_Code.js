const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User_Code extends Model {}

User_Code.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.TEXT,
    },
    language: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "user_code",
  }
);

module.exports = User_Code;

// When add all the languages the code editor performs
// language_id: {
//     type: DataTypes.INTEGER,
//     references: {
//     model: "languages",
//     key: "id",
//   },
// },
