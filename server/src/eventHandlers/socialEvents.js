const sessions = require('../models/sessionModel');

const getOnlineUsers = async(socket) => {
  const userList = await sessions.getOnlineUsers();
  socket.emit('USER_LIST', userList);
};

const userLogin = (socket, data) => socket.broadcast.emit('USER_LOGIN', data);
const userLogoff = (socket, data) => socket.broadcast.emit('USER_LOGOFF', data);

const attachEvents = socket => socket.on('GET_ONLINE', () => getOnlineUsers(socket));

module.exports = {
  attachEvents,
  userLogin,
  userLogoff,
};