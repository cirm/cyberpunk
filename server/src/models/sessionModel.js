// @flow
const _ = require('lodash');
const events = require('../constants');

const onlineUsers: User[] = [];

const updateExistingUser = async (object: User, socket: Socket) => {
  object.socket.emit(events.LOGOUT);
  return _.assign(object, { socket });
};
const addNewUser = async (userId: string, username: string, socket: Socket) =>
  onlineUsers.push({ userId, username, socket });

const addUserOnline = async (userId: string, username: string, socket: Socket) => {
  const object = await _.find(onlineUsers, ['userId', userId]);
  if (object) {
    return updateExistingUser(object, socket);
  }
  return addNewUser(userId, username, socket);
};

const getUserBySocket = async (socketId: string): Promise<User | void> => _.find(onlineUsers, ['socket.id', socketId]);

const getOnlineUsers = () => _.reduce(onlineUsers, (result, val) => {
  result.push({ id: val.userId, username: val.username });
  return result;
}, []);

const userSignOff = async (userId: string) => _.remove(onlineUsers, user => user.userId === userId);

const rooms = {};

const addRoom = (roomId: string, roomDisplay: string) => _.set(rooms, roomId, roomDisplay);
const deleteRoom = (roomId: string) => _.unset(rooms, roomId);

const user2room = {};

const addUser2Room = (roomId: string, userId: string) => _.set(user2room, roomId, userId);
const removeUserFromRoom = (roomId: string, userId: string) => _.unset(user2room, `${roomId}.${userId}`);

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
