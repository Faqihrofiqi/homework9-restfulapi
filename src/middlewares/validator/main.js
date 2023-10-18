const { body } = require("express-validator");

const mainRequirement = {
    login: [
        body('email').isEmail(),
        body('password').isString().isLength({ min: 5 })
    ],
    signup: [
        body('id').isInt().isLength({ min: 1 }),
        body('email').isEmail(),
        body('gender').isString().isIn(['Male', 'Female']),
        body('password').isString().isLength({ min: 5 }),
        body('role').isString().optional({ nullable: true })
    ]
};

export default mainRequirement;