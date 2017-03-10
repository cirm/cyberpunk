const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

const createSalt = async() => await bcrypt.genSaltAsync(11);
const hashPwd = async(pwd, salt) => await bcrypt.hashAsync(pwd, salt);
const compareHash = async(password, hashedPassword) =>
  await bcrypt.compareAsync(password, hashedPassword);

module.exports = {
  createSalt,
  compareHash,
  hashPwd,
};
