"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Log.belongsTo(models.User, { foreignKey: "authorId" });
    }
  }
  Log.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `name log can't be null`,
          },
          notEmpty: {
            msg: `name log can't be empty`,
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `name log can't be null`,
          },
          notEmpty: {
            msg: `name log can't be empty`,
          },
        },
      },
      updatedBy: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Log",
    }
  );
  return Log;
};
