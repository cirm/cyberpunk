const Promise = require('bluebird');
const JWT = Promise.promisifyAll(require('jsonwebtoken'));
const db = require('../db/postgres');
const logger = require('../utilities/winston');
const config = require('../config');
const events = require('../constants');
const sessions = require('../models/sessionModel');
const users = require('../models/userModel');
const errors = require('../utilities/errors');

const authenticationError = errors.authenticationError;
const tokenError = errors.tokenError;

const socialEvents = require('./socialEvents');

/**
 * Extracts token part from sent JWT
 *
 * @param {string} bearerToken - Token used for authentication
 * @returns {string || boolean}
 */
function extractToken(bearerToken) {
  const parts = bearerToken.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return false;
  }
  return parts[1];
}

/**
 * Handles authentication of received JWT
 *
 * @param {string} bearer - Encoded JWT sent by the client
 * @returns {Promise.<string> || boolean}
 */
const checkToken = async (bearer) => {
  if (!bearer) return false;
  let isAllowed;
  const token = extractToken(bearer);
  try {
    isAllowed = await JWT.verifyAsync(token, config.tokenSecret);
  } catch (e) {
    logger.info(tokenError(e));
    isAllowed = false;
  }
  return isAllowed;
};

const renewSocketAuth = async (data, socket) => {
  const profile = await checkToken(data.token);
  if (!profile) {
    return socket.emit(events.ERROR, 'Authentication error');
  }
  const userList = await sessions.addUserOnline(profile.id, profile.username, socket);
  socket.emit('USER_LIST', userList);
  return socket.emit(events.SOCKET_RENEWED);
};

const doAuth = async (data, socket) => {
  if (!data || !data.username) return socket.emit(events.UNAUTHORIZED);
  logger.info(`We got authToken event for username: ${data.username}`);
  let shouldAccess;
  let decker;
  try {
    decker = await users.populateUser({ username: data.username.toString() }, db);
    shouldAccess = await users.authenticate(decker, data.password, db);
  } catch (e) {
    logger.info(authenticationError(e));
  }
  if (shouldAccess) {
    const token = await JWT.signAsync(
      {
        id: decker.id,
        username: decker.username,
        display: decker.display,
        roles: decker.roles,
      },
      config.tokenSecret, { expiresIn: config.tokenOptions.expiresIn });
    await sessions.addUserOnline(decker.id, decker.username, socket);
    socket.emit(events.TOKEN, { token });
    await socialEvents.userLogin(socket, { id: decker.id, username: decker.username });
  } else {
    socket.emit(events.UNAUTHORIZED);
  }
};

/**
 * Removes user from onlineUsers list
 *
 * @param {Socket} socket - Socket connection to log out
 */
const logout = async (socket) => {
  const user = await sessions.getUserBySocket(socket.id);
  if (!user) return;
  await sessions.userSignOff(user.userId);
  socialEvents.userLogoff(socket, { id: user.userId, username: user.username });
};

const attachEvents = (socket) => {
  socket.on(events.AUTHENTICATE, data => doAuth(data, socket));
  socket.on('disconnect', () => logout(socket));
  socket.on(events.LOGOUT, () => logout(socket));
  socket.on(events.SOCKET_REFRESH, data => renewSocketAuth(data, socket));
};

module.exports = {
  attachEvents,
  checkToken,
};
