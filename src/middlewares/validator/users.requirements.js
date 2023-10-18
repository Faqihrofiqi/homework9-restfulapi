const { body, param } = require("express-validator");

const requirements = {
    getUserById: [param('id').isInt()],
    updateUser: [
        param('id').isInt(),
        body('email').isEmail(),
        body('gender').isString().isIn(['Male', 'Female']),
        body('password').isString().isLength({ min: 5 }),
        body('role').isString().isIn([ "admin", "member" ])
    ],
    deleteUser: [param('id').isInt()],
    getUserDetail: [body('email').isEmail(),]
};

module.exports = requirements;