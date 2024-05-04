const { knex, db } = require("../db");
const util = require("../util");
const Products = require("../models/Products");

exports.index = (req, res, next) => {
  let page = req.query.page || 1;
  let size = req.query.size || 10;
  let sort = req.query.sort || "Products.ProductId";
  let sortDirection = req.query.sort
    ? req.query.desc
      ? "desc"
      : "asc"
    : "asc";
  let column = req.query.sc;
  let query = knex("Products")
    .select(
      "Products.ProductId",
      "Products.Name",
      "Products.Description",
      "Products.Price",
      "Products.StockQuantity",
    )
    .orderBy(sort, sortDirection);
  let columns = query._statements.find((e) => e.grouping == "columns").value;
  if (util.isInvalidSearch(columns, column)) {
    return res.sendStatus(403);
  }
  if (req.query.sw) {
    let search = req.query.sw;
    let operator = util.getOperator(req.query.so);
    if (operator == "like") {
      search = `%${search}%`;
    }
    query.where(column, operator, search);
  }
  let sqlCount = query
    .clone()
    .clearSelect()
    .clearOrder()
    .count('* as "count"')
    .toString();
  let sqlQuery = query
    .offset((page - 1) * size)
    .limit(size)
    .toString();
  Promise.all([
    db.query(sqlCount, { type: "SELECT", plain: true }),
    db.query(sqlQuery, { type: "SELECT" }),
  ])
    .then(([count, productses]) => {
      let last = Math.ceil(count.count / size);
      res.send({ productses, last });
    })
    .catch(next);
};

exports.getCreate = (req, res, next) => {
  res.end();
};

exports.create = (req, res, next) => {
  let products = util.parseData(Products, { ...req.body });
  Products.create(products)
    .then(() => {
      res.end();
    })
    .catch(next);
};

exports.get = (req, res, next) => {
  let sqlProducts = knex("Products")
    .select(
      "Products.ProductId",
      "Products.Name",
      "Products.Description",
      "Products.Price",
      "Products.StockQuantity",
    )
    .where("Products.ProductId", req.params.productId)
    .toString();
  db.query(sqlProducts, { type: "SELECT", plain: true })
    .then((products) => {
      res.send({ products });
    })
    .catch(next);
};

exports.edit = (req, res, next) => {
  let sqlProducts = knex("Products")
    .select(
      "Products.ProductId",
      "Products.Name",
      "Products.Description",
      "Products.Price",
      "Products.StockQuantity",
    )
    .where("Products.ProductId", req.params.productId)
    .toString();
  db.query(sqlProducts, { type: "SELECT", plain: true })
    .then((products) => {
      res.send({ products });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  let products = util.parseData(Products, { ...req.body });
  Products.update(products, { where: { ProductId: req.params.productId } })
    .then(() => {
      res.end();
    })
    .catch(next);
};

exports.getDelete = (req, res, next) => {
  let sqlProducts = knex("Products")
    .select(
      "Products.ProductId",
      "Products.Name",
      "Products.Description",
      "Products.Price",
      "Products.StockQuantity",
    )
    .where("Products.ProductId", req.params.productId)
    .toString();
  db.query(sqlProducts, { type: "SELECT", plain: true })
    .then((products) => {
      res.send({ products });
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  Products.destroy({ where: { ProductId: req.params.productId } })
    .then(() => {
      res.end();
    })
    .catch(next);
};
