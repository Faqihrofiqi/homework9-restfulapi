const { usersRepositories } = require("../repositories");
const bcrypt = require("bcrypt")

async function getUsers({ page = 1, limit = 10 }) {
    if (page < 1 || limit < 1) {
        return Promise.reject(new Error("Invalid page and/or limit"));
    }
    const users = await usersRepositories.getUsers({
        page,
        limit,
    });

    if (users.rows.length === 0) {
        return Promise.reject(new Error("Users not found"));
    }

    return users;
}

async function getUserById(id) {
    if (!id) {
        return Promise.reject(new Error("Invalid id"));
    }

    const users = await usersRepositories.getUserById(id);
    if (users.rows.length === 0) {
        return Promise.reject(new Error("Users   not found"));
    }

    return users;
}


async function updateUser({ id, email, gender, password, role }) {
    if (!id) {
        return Promise.reject(new Error("Invalid id"));
    }

    const getUser = await usersRepositories.getUserById(id);
    if (getUser.rows.length === 0) {
        return Promise.reject(new Error("User not found"));
    }

    if (!email || !gender || !password || !role) {
        return Promise.reject(new Error("Some argument is empty"));
    }
    const hashedPassword = bcrypt.hashSync(password, 5)
    const users = await usersRepositories.updateUser({
        id, email, gender, password: hashedPassword, role
    });
    return users;
}

async function deleteUser(id) {
    if (!id) {
        return Promise.reject(new Error("Invalid id"));
    }

    const getUser = await usersRepositories.getUserById(id);
    if (getUser.rows.length === 0) {
        return Promise.reject(new Error("User not found"));
    }

    const users = await usersRepositories.deleteUser(id);
    return users;
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
