const Server = require('socket.io');
const socketEvents = require('./eventHandlers/socketEvents');

let io;

const start = () => {
  io = new Server().attach(4545);
  io.on('connection', socketEvents);
};

module.exports = start;
