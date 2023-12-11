"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Customer, { foreignKey: "CustomerId" });
      Bookmark.belongsTo(models.Lodging, { foreignKey: "LodgingId" });
    }
  }
  Bookmark.init(
    {
      CustomerId: DataTypes.INTEGER,
      LodgingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bookmark",
    }
  );
  return Bookmark;
};
