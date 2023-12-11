class Trash {
  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({
        where: email,
      });

      if (user) {
        //! Hasil dari FindOne = user
        let checkResult = comparePassword(password, user.password);
        // console.log(checkResult);
        if (checkResult) {
          let payload = {
            id: user.id,
            email: user.email,
            role: user.role,
          };

          let token = createToken(payload);

          res.status(200).json({
            access_token: token,
          });
        } else {
          throw { name: "invalid email or password" };
        }
      } else {
        throw { name: "invalid email or password" };
      }
    } catch (error) {
      let statusCode = 500;
      let message = "Internal Server Error";

      if (error.name === "login") {
        statusCode = 401;
        message = "Invalid Email or Password";
      }

      res.status(statusCode).json({ message: message });
    }
  }
}
