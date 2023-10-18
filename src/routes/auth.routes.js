const { Router } = require("express");
const { authControllers } = require("../controllers");
const { validator } = require("../middlewares");

const mainRouter = Router();
const { validate, requirements } = validator;

mainRouter
  .route("/signup")
  .post(validate(requirements.signup), authControllers.signUp)

mainRouter
  .route("/login")
  .post(validate(requirements.login), authControllers.login)

  module.exports = mainRouter;