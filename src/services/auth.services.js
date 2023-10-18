const bcrypt = require("bcrypt")
const { usersRepositories } = require("../repositories");
const JWT = require("../utils/jwt");

class AuthService {
  async login({ email, password }) {
    const user = await usersRepositories.getUserDetail(email)

    if (user.rows.length === 0) {
      throw new Error("Email and Password is not match")
    }

    const isValid = bcrypt.compareSync(password, user.rows[0].password);
    

    if (!isValid) {
      throw new Error("Email and Password is not match")
    }

    const token = await JWT.signToken(user.rows[0].id)

    if (!token) {
      throw new Error("Invalid token")
    }

    return token
  }

  async signUp({ id, email, gender, password, role }) {
    const user = await usersRepositories.getUserDetail(email)

    if (user.rows.length !== 0) {
      throw new Error("Email must be unique");
    }
    const hashedPassword = bcrypt.hashSync(password, 5)

      return usersRepositories.createUser({
        id, email, gender, role,
        password: hashedPassword
      });
  }
}

module.exports = new AuthService();
