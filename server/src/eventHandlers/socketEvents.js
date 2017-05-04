const _ = require('lodash');
const logger = require('../utilities/winston');
const deckerEvents = require('./deckerEvents');
const authEvents = require('./authEvents');
const socialEvents = require('./socialEvents');

const testingEvent = socket => socket.emit('tested');

const protectedRoutes = { testing: testingEvent };

const attachProtectedEventsToSocket = (socket) => {
  _.mapValues(protectedRoutes, (fn, key) =>
    socket.on(key, async (data) => {
      if (!data || !data.token) {
        socket.emit('ERROR', 'Authentication error');
        return;
      }
      const isAllowed = await authEvents.checkToken(data.token);
      if (!isAllowed) {
        socket.emit('ERROR', 'Authentication error');
        return;
      }
      fn(socket, data);
    }));
};

const socketEvents = (socket) => {
  logger.info(`We got a connection: ${socket.id}`);
  attachProtectedEventsToSocket(socket);
  authEvents.attachEvents(socket);
  socialEvents.attachEvents(socket);
  deckerEvents.attachEvents(socket);
  socket.on('disconnect', () => {
    logger.info(`We got a disconnection: ${socket.id}`);
  });
};

module.exports = socketEvents;
