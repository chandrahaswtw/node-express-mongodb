const Sequelize = require("sequelize");
const sequelize = new Sequelize("onlinestore", "root", "XXXX", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
