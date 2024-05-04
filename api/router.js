const express = require("express");
const util = require("./util");
const authorize = require("./middleware/authorize");
const system = require("./controllers/SystemController.js");
const authen = require("./controllers/LoginController.js");
const userAccount = require("./controllers/UserAccountController.js");
const products = require("./controllers/ProductsController.js");

module.exports = express
  .Router()
  .post("/login", authen.login)
  .get("/logout", authen.logout)
  .post("/resetPassword", authen.resetPassword)
  .get("/changePassword/:token", authen.getChangePassword)
  .post("/changePassword/:token", authen.changePassword)
  .get("/user", authen.user)
  .get("/profile", system.profile)
  .post("/updateProfile", system.updateProfile)
  .get("/stack", system.stack)
  .use(
    "/userAccounts",
    authorize("ADMIN"),
    express
      .Router()
      .get("/", userAccount.index)
      .post("/", userAccount.create)
      .get("/create", userAccount.getCreate)
      .get("/:id", userAccount.get)
      .get("/:id/edit", userAccount.edit)
      .put("/:id", userAccount.update)
      .get("/:id/delete", userAccount.getDelete)
      .delete("/:id", userAccount.delete),
  )
  .use(
    "/productses",
    authorize("ADMIN,USER"),
    express
      .Router()
      .get("/", products.index)
      .post("/", products.create)
      .get("/create", products.getCreate)
      .get("/:productId", products.get)
      .get("/:productId/edit", products.edit)
      .put("/:productId", products.update)
      .get("/:productId/delete", products.getDelete)
      .delete("/:productId", products.delete),
  );
