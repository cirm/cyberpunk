const bcrypt = require('../utilities/bcrypt');

/**
 * Takes db result and cleans it up to a json object
 * @param data
 * @returns {{id: string, username: string, display: string, roles: string, password: string}}
 */
function sanitizeDbUser(data = {}) {
  return {
    id: data.id || '',
    username: data.username || '',
    display: data.display || '',
    roles: data.roles || '',
    password: data.password || '',
  };
}

/**
 *
 * @param user
 * @param db
 * @returns {Promise.<{id: string, username: string, display: string, roles: string, password: string}>}
 */
const populateUser = async (user = { username: 'skiddle' }, db) => {
  if (!db) throw new Error('Missing database');
  let qr = await db.queryFunction('decker.get_player_data', user.username);
  if (qr[0].get_player_data === null) throw new Error(`No record of user: ${user.username}`);
  qr = qr[0].get_player_data[0];
  return sanitizeDbUser({
    id: qr.id,
    username: qr.username,
    roles: qr.roles,
    password: qr.hpassword,
  });
};

/**
 *
 * @param user
 * @param passwordToMatch
 * @param db
 * @returns {Promise.<bool> || bool}
 */
const authenticate = async (user, passwordToMatch, db) => {
  if (!user || !user.username) {
    return false;
  }
  if (!user.password) {
    if (!db) throw new Error('Missing database');
    const rUser = await populateUser(user, db);
    return bcrypt.compareHash(passwordToMatch, rUser.password);
  }
  return bcrypt.compareHash(passwordToMatch, user.password);
};

module.exports = {
  sanitizeDbUser,
  populateUser,
  authenticate,
};
