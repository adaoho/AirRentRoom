require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

// console.log(jwt);

function createToken(payload) {
  return sign(payload, SECRET);
}

function verifyToken(token) {
  return verify(token, SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
