const { appConfig } = require("../config");
const jwt = require("jsonwebtoken");

class JWT {
    signToken(userId, expires = "1h") {
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    id: userId,
                    iat: Date.now()
                },
                appConfig.SECRET,
                {
                    expiresIn: expires
                },
                (err, token) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(token)
                }
            )
        })
    }

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, appConfig.SECRET, (err, decoded) => {
                if (err) {
                    reject(err)
                }
                resolve(decoded)
            })
        })
    }
}

module.exports = new JWT();
