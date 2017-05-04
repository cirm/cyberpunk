const bcrypt = require('bcrypt');

const createSalt = (times = 11) => bcrypt.genSalt(times);
const hashPwd = (pwd, salt) => bcrypt.hash(pwd, salt);
const compareHash = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

module.exports = {
  createSalt,
  compareHash,
  hashPwd,
};
