const { Router } = require("express");
const moviesRoutes = require("./movies.routes");
const usersRoutes = require("./users.routes");
const mainRoutes = require("./auth.routes")

const router = Router();

router.use("/movies", moviesRoutes);
router.use("/users", usersRoutes);
router.use("/", mainRoutes);

module.exports = router;
