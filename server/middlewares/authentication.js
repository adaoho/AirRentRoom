const { LoginTicket } = require("google-auth-library");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }

    const decoded = verifyToken(access_token);

    // console.log(decoded, "<<< ini decoded");

    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "Unauthenticated"
    ) {
      res.status(401).json({
        message: "Invalid Token",
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = authentication;
