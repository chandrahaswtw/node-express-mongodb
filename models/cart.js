const sequelize = require("./../utils/database");
const { DataTypes, Model } = require("sequelize");

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  { sequelize, timestamps: false, modelName: "cart", freezeTableName: true }
);

module.exports = { Cart };
