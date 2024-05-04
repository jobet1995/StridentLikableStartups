const Sequelize = require("sequelize");
const knex = require("knex");
const moment = require("moment");
const config = require("./config").db;
const util = require("./util");

module.exports.knex = knex({
  client: "sqlite",
  wrapIdenttifier: (value) => value,
  connection: {
    filename: "./inventory.sqlite",
  },
  useNullAsDefault: true,
});

module.exports.db = new Sequelize({
  dialect: "sqlite",
  storage: "./inventory.sqlite",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  quoteIdentifiers: false,
  logging: false,
});
