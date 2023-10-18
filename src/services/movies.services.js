const { moviesRepositories } = require("../repositories");

async function getMovies({ page = 1, limit = 10 }) {
    if (page < 1 || limit < 1) {
        return Promise.reject(new Error("Invalid page and/or limit"));
    }
    const movies = await moviesRepositories.getMovies({
        page,
        limit,
    });

    if (movies.rows.length === 0) {
        return Promise.reject(new Error("Movies not found"));
    }

    return movies;
}

async function getMovieById(id) {
    if (!id) {
        return Promise.reject(new Error("Invalid id"));
    }

    const movies = await moviesRepositories.getMovieById(id);
    if (movies.rows.length === 0) {
        return Promise.reject(new Error("Movie   not found"));
    }

    return movies;
}

async function createMovie({ id, title, genres, year }) {
    if (!id || !title || !genres || !year) {
        return Promise.reject(new Error("Some argument is empty"));
    }
    const movies = await moviesRepositories.createMovie({
        id, title, genres, year
    });
    return movies;
}

async function updateMovie({ id, title, genres, year }) {
    if (!id) {
        return Promise.reject(new Error("Invalid id"));
    }

    const getMovie = await moviesRepositories.getMovieById(id);
    if (getMovie.rows.length === 0) {
        return Promise.reject(new Error("Movie not found"));
    }

    if (!title || !genres || !year) {
        return Promise.reject(new Error("Some argument is empty"));
    }
    const movies = await moviesRepositories.updateMovie({
        id, title, genres, year
    });
    return movies;
}

async function deleteMovie(id) {
    if (!id) {
        return Promise.reject(new Error("Invalid id"));
    }

    const getMovie = await moviesRepositories.getMovieById(id);
    if (getMovie.rows.length === 0) {
        return Promise.reject(new Error("Movie not found"));
    }

    const movies = await moviesRepositories.deleteMovie(id);
    return movies;
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
