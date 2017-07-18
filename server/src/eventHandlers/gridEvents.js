const gridModel = require('../models/gridModel');


<<<<<<< HEAD









const getGrid = socket => {
  console.log('request');
  let grid = gridModel.getState();
  if (grid.cells.length < 1) { // FIXME REMOVE THIS BEFORE PRODUCTION :D
    grid = gridModel.createGrid();
  }
  return socket.emit('GRID_DATA', gridModel.getState())
}








=======
const getGrid = socket => socket.emit('GRID_DATA', gridModel.getState());
>>>>>>> tinkering


const attachEvents = socket => {
  socket.on('GET_GRID', () => undefined);
  socket.on('UPDATE_GRID', () => undefined);
  socket.on('CREATE_GRID', () => undefined);
};

module.exports = {
  getGrid,
};
