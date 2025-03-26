const AuthController = require("../controllers/auth.controller");
const authRouter = require("express").Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);

module.exports = authRouter;
