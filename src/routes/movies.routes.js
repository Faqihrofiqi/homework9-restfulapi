const { Router } = require("express");
const { moviesControllers } = require("../controllers");
const { validator } = require("../middlewares");
const Auth = require("../middlewares/auth");
const ROLE = require("../constants")

const router = Router();
const { validate, requirements } = validator;

router
    .route("/")
    .get(
        Auth.authenticate,
        validate(requirements.getMovies),
        Auth.checkUser(ROLE.MEMBER),
        moviesControllers.getMovies
    )
    
router
    .route("/admin")
    .get(
        Auth.authenticate,
        validate(requirements.getMovies),
        Auth.checkUser(ROLE.ADMIN),
        moviesControllers.getMovies
    )
    .post(
        Auth.authenticate,
        validate(requirements.createMovie),
        Auth.checkUser(ROLE.ADMIN),
        moviesControllers.createMovie,
    )
    

router
    .route("/:id")
    .get(
        Auth.authenticate,
        validate(requirements.getMovieById),
        Auth.checkUser(ROLE.MEMBER),
        moviesControllers.getMovieById
    )
router
    .route("/admin/:id")
    .get(
        Auth.authenticate,
        validate(requirements.getMovieById),
        Auth.checkUser(ROLE.ADMIN),
        moviesControllers.getMovieById
    )
    .put(
        Auth.authenticate,
        validate(requirements.updateMovie),
        Auth.checkUser(ROLE.ADMIN),
        moviesControllers.updateMovie,
    )
    .delete(
        Auth.authenticate,
        validate(requirements.deleteMovie),
        Auth.checkUser(ROLE.ADMIN),
        moviesControllers.deleteMovie,
    )
    
module.exports = router;