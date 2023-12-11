const { hashSync, genSaltSync, compareSync } = require("bcrypt");

// console.log(bycryptjs);

function hashPassword(password) {
  let salt = genSaltSync(10);
  let hashedPassword = hashSync(password, salt);
  return hashedPassword;
}

function comparePassword(input, hashedPassword) {
  return compareSync(input, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
