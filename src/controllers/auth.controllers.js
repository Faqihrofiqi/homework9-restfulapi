const AuthService = require("../services/auth.services");

class AuthController {
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const token = await AuthService.login({email, password})
      res.status(200).send({
        message: "Logged in successfully",
        data: token
      })
    } catch (error) {
      next(error)
    }
  }

  async signUp(req, res, next) {
    try {
      const id = req.body.id;
      const email = req.body.email;
      const gender = req.body.gender;
      const password = req.body.password;
      const role = req.body.role;
      await AuthService.signUp({ id, email, gender, password, role })
      res.status(200).send({
        message: "Signed up successfully"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController();