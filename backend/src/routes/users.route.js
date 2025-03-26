const UserController = require("../controllers/users.controller");
const usersRouter = require("express").Router();

usersRouter.get("/", UserController.getAll);

module.exports = usersRouter;
