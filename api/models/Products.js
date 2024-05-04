const Sequelize = require("sequelize");
const { db } = require("../db");

module.exports = db.define("Products", {
  ProductId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: Sequelize.STRING,
  Description: Sequelize.STRING,
  Price: Sequelize.DECIMAL,
  StockQuantity: Sequelize.INTEGER,
});
