const bcrypt = require('../utilities/bcrypt');

function sanitizeDbUser(data = {}) {
  return {
    id: data.id || '',
    username: data.username || '',
    display: data.display || '',
    roles: data.roles || '',
    password: data.password || '',
  };
}

const populateUser = async (user = { username: 'skiddle' }, db) => {
  if (!db) throw new Error('Missing database');
  let qr = await db.queryFunction('decker.get_player_data', user.username);
  if (qr[0].get_player_data === null) throw new Error(`No record of user: ${user.username}`);
  qr = qr[0].get_player_data[0];
  return sanitizeDbUser({ id: qr.id, username: qr.username, roles: qr.roles, password: qr.hpassword });
};

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
