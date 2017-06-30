
const gridModel = require('../models/gridModel');











const getGrid = socket => socket.emit('GRID_DATA', gridModel.getState())










const attachEvents = socket => {
  socket.on('GET_GRID', () => undefined);
  socket.on('UPDATE_GRID', () => undefined);
  socket.on('CREATE_GRID', () => undefined);
};

module.exports = {
  getGrid,
};
