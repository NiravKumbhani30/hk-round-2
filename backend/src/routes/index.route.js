const Router = require("express").Router();
const authRouter = require("./auth.route");
const usersRouter = require("./users.route");

Router.use("/users", usersRouter);
Router.use("/auth", authRouter);

module.exports = Router;
