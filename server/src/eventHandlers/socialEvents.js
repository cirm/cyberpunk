const sessions = require('../models/sessionModel');

/**
 * Broadcasts online users to requesting socket
 *
 * @param {Socket} socket - Socket connection that is requesting data
 */
const getOnlineUsers = async (socket) => {
  const userList = await sessions.getOnlineUsers();
  socket.emit('USER_LIST', userList);
};

const userLogin = (socket, data) => socket.broadcast.emit('USER_LOGIN', data);
const userLogoff = (socket, data) => socket.broadcast.emit('USER_LOGOUT', data);

/**
 * Attaches events to given socket
 *
 * @param {Socket} socket - Socket used to attach events
 */
const attachEvents = socket => socket.on('GET_ONLINE', () => getOnlineUsers(socket));

module.exports = {
  attachEvents,
  userLogin,
  userLogoff,
};
