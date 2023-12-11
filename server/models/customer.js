"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Bookmark, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Email already registered`,
        },
        validate: {
          notNull: {
            msg: `Email can't be null`,
          },
          notEmpty: {
            msg: `Email can't be empty`,
          },
          isEmail: {
            msg: `Wrong email Format`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Password can't be null`,
          },
          notEmpty: {
            msg: `Password can't be empty`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );

  Customer.beforeCreate((customer) => {
    customer.password = hashPassword(customer.password);
  });

  return Customer;
};
