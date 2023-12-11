"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lodging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lodging.belongsTo(models.Type, { foreignKey: "typeId" });
      Lodging.belongsTo(models.User, { foreignKey: "authorId" });
      Lodging.hasMany(models.Bookmark, { foreignKey: "LodgingId" });
    }
  }
  Lodging.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Name can't be null`,
          },
          notEmpty: {
            msg: `Name can't be empty`,
          },
        },
      },
      facility: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Facility can't be null`,
          },
          notEmpty: {
            msg: `Facility can't be empty`,
          },
        },
      },
      roomCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: `Room Capacity must be a number`,
          },
          notNull: {
            msg: `Room Capacity can't be null`,
          },
          notEmpty: {
            msg: `Room Capacity can't be empty`,
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Image Url can't be null`,
          },
          notEmpty: {
            msg: `Image Url can't be empty`,
          },
          isUrl: {
            msg: `Image Url must be a link`,
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Location can't be null`,
          },
          notEmpty: {
            msg: `Location can't be empty`,
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Price can't be null`,
          },
          min: {
            args: 100000,
            msg: `Minimum Price 100.000`,
          },
        },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Location can't be null`,
          },
          notEmpty: {
            msg: `Location can't be empty`,
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
        validate: {
          notNull: {
            msg: `status can't be null`,
          },
          notEmpty: {
            msg: `status can't be empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Lodging",
    }
  );
  return Lodging;
};
