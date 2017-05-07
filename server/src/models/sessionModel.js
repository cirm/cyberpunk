const _ = require('lodash');
const events = require('../constants');

const onlineUsers = [];

const updateExistingUser = async (object, userId, username, socket) => {
  object.socket.emit(events.LOGOUT);
  return _.assign(object, { socket });
};
const addNewUser = async (userId, username, socket) =>
  onlineUsers.push({ userId, username, socket });

const addUserOnline = async (userId, username, socket) => {
  const object = await _.find(onlineUsers, ['userId', userId]);
  if (object) {
    return updateExistingUser(object, userId, username, socket);
  }
  return addNewUser(userId, username, socket);
};

const getUserBySocket = async socketId => _.find(onlineUsers, ['socket.id', socketId]);

const getOnlineUsers = () => _.reduce(onlineUsers, (result, val) => {
  result.push(_.set({}, val.userId, val.username));
  return result;
}, []);

const userSignOff = async userId => _.remove(onlineUsers, user => user.userId === userId);

const rooms = {};

const addRoom = (roomId, roomDisplay) => _.set(rooms, roomId, roomDisplay);
const deleteRoom = roomId => _.unset(rooms, roomId);

const user2room = {};

const addUser2Room = (roomId, userId) => _.set(user2room, roomId, userId);
const removeUserFromRoom = (roomId, userId) => _.unset(user2room, `${roomId}.${userId}`);

module.exports = {
  getUserBySocket,
  onlineUsers,
  addUserOnline,
  userSignOff,
  rooms,
  getOnlineUsers,
  addRoom,
  deleteRoom,
  user2room,
  addUser2Room,
  removeUserFromRoom,
};
