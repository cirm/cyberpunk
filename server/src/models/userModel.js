const bcrypt = require('../utilities/bcrypt');

function getRawUser(data) {
  return {
    id: data.id,
    username: data.username,
    display: data.display,
    roles: data.roles,
    password: data.password,
  };
}

const populateUser = async(user = { username: 'skiddle' }, db) => {
  let qr = await db.queryFunction('decker.get_player_data', user.username);
  if (qr[0].get_player_data === null) throw new Error(`No record of user: ${user.username}`);
  qr = qr[0].get_player_data[0];
  return getRawUser({ id: qr.id, username: qr.username, roles: qr.roles, password: qr.hpassword });
};

const authenticate = async(user, passwordToMatch, db) => {
  if (!user || !user.username) {
    return false;
  }
  if (!user.password) {
    const rUser = await populateUser(user, db);
    return await bcrypt.compareHash(passwordToMatch, rUser.password);
  }
  return await bcrypt.compareHash(passwordToMatch, user.password);
};

module.exports = {
  getRawUser,
  populateUser,
  authenticate,
};
