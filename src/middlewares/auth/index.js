const JWT = require("../../utils/jwt");
const { usersRepositories } = require("../../repositories");

class Auth {
    async authenticate(req, res, next) {
        const authorization = String(req.headers.authorization)
        if (!authorization || !authorization.includes("Bearer")) {
            return res.sendStatus(401)
        }
        const token = authorization?.slice(7)
        const payload = await JWT.verifyToken(token)

        if (!payload) {
            return res.sendStatus(401)
        }

        const userId = payload.id
        const userdata = await usersRepositories.getUserById(userId)

        if (!userdata) {
            return res.sendStatus(401)
        }
        req.userdata = userdata

        next()
    }

    checkUser(...roles) {
        return async (req, res, next) => {
            const roleUser = req.userdata;

            if (roleUser.rows[0].role != roles) {
                return res.sendStatus(403)
            }
            next()
        }
    }
}

module.exports = new Auth();