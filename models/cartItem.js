const sequelize = require("./../utils/database");
const { DataTypes, Model } = require("sequelize");

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, timestamps: false, modelName: "cartitem", freezeTableName: true }
);

module.exports = { CartItem };
