"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class house extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      house.hasMany(models.character);
    }
  }
  house.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      sigil: DataTypes.STRING,
      head: DataTypes.STRING,
      extinct: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "house",
    }
  );
  return house;
};
