const Server = require('socket.io');
const socketEvents = require('./eventHandlers/socketEvents');

const start = () => {
  const io = new Server().attach(4545);
  io.on('connection', socketEvents);
};

module.exports = start;
