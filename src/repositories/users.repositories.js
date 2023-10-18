const pool = require("../utils/db");

function getUsers(params) {
    return new Promise((resolve, reject) => {
        const page = params.page || 1;
        const perPage = params.per_page || 10;
        pool.query(
            `SELECT * FROM users ORDER BY id ASC LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            },
        )
    });
}

function getUserDetail(email) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE email = '${email}'`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            },
        )
    });
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM users WHERE id=${id}`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            },
        )
    });
}

function createUser(params) {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO users(id, email, gender, password, role ) VALUES(${params.id}, '${params.email}', '${params.gender}', '${params.password}', '${params.role}')`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
}

function updateUser(params) {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE users SET email = '${params.email}', gender = '${params.gender}', password = '${params.password}', role = '${params.role}' WHERE id = ${params.id}`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        pool.query(
            `DELETE FROM users WHERE id = ${id}`,
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
    getUsers,
    getUserDetail,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};