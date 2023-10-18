const { body, param, query } = require("express-validator");

const requirements = {
    getMovies: [
        query("page").isInt({ min: 1 }).optional({ nullable: true }),
        query("limit").isInt({ min: 10, max: 50 }).optional({ nullable: true }),
    ],

    getMovieById: [
        param("id").isInt({ min: 1 })
    ],

    createMovie: [
        body("id").isInt({ min: 1 }),
        body("title").isString().isLength({ min: 3 }),
        body("genres").isString().isLength({ min: 3 }),
        body("year").isString({ min: 4 })
    ],

    updateMovie: [
        param("id").isInt({ min: 1 }),
        body("title").isString().isLength({ min: 3 }),
        body("genres").isString().isLength({ min: 3 }),
        body("year").isString({ min: 4 })
    ],

    deleteMovie: [
        param("id").isInt({ min: 1 })
    ],
};

module.exports = requirements;
