const { Router } = require("express");
const { usersControllers } = require("../controllers");
const { validator } = require("../middlewares");
const Auth = require("../middlewares/auth");
const ROLE = require("../constants");

const router = Router();
const { validate, requirements } = validator;

router
    .route("/")
    .get(
        Auth.authenticate,
        Auth.checkUser(ROLE.ADMIN),
        usersControllers.getUsers
    );

router
    .route("/:id")
    .get(
        Auth.authenticate,
        validate(requirements.getUserById),
        Auth.checkUser(ROLE.ADMIN),
        usersControllers.getUserById
    )
    .put(
        Auth.authenticate,
        validate(requirements.updateUser),
        Auth.checkUser(ROLE.ADMIN),
        usersControllers.updateUser,
    )
    .delete(
        Auth.authenticate,
        validate(requirements.deleteUser),
        Auth.checkUser(ROLE.ADMIN),
        usersControllers.deleteUser,
    )


module.exports = router;