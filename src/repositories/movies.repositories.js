const pool = require("../utils/db");

function getMovies(params) {
    return new Promise((resolve, reject) => {
        const page = params.page;
        const limit = params.limit;
        pool.query(
            `SELECT * FROM movies ORDER BY id ASC LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            },
        )
    });
}

function getMovieById(id) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM movies WHERE id=${id}`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            },
        )
    });
}

function createMovie(params) {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO movies(id, title, genres, year) VALUES(${params.id}, '${params.title}', '${params.genres}', ${params.year})`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
}

function updateMovie(params) {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE movies SET title = '${params.title}', genres = '${params.genres}', year = '${params.year}' WHERE id = ${params.id}`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
}

function deleteMovie(id) {
    return new Promise((resolve, reject) => {
        pool.query(
            `DELETE FROM movies WHERE id = ${id}`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};