const { usersServices } = require("../services");

async function getUsers(req, res, next) {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        const result = await usersServices.getUsers({ page, limit});
        res.json({
            status: "success",
            data: result.rows,
        });
    } catch (err) {
        next(err);
    }
}

async function getUserById(req, res, next) {
    try {
        const id = req.params.id;
        const result = await usersServices.getUserById(id);
        res.json({
            status: "success",
            data: result.rows,
        });
    } catch (err) {
        next(err);
    }
}


async function updateUser(req, res, next) {
    try {
        const id = req.params.id;
        const email = req.body.email;
        const gender = req.body.gender;
        const password = req.body.password;
        const role = req.body.role;
        const result = await usersServices.updateUser({ id, email, gender, password, role });
        const resResponse = await usersServices.getUserById(id);
        res.json({
            status: "success",
            data: resResponse.rows,
        });
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const id = req.params.id;
        const result = await usersServices.deleteUser(id);
        res.json({
            status: "success",
            data: result.rows,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
