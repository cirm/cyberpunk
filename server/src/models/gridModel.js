const cloneDeep = require('lodash/fp/cloneDeep');
const cellModel = require('./cellModel');

const Grid = {
  side: 20,
  cells: [],
};

const getCells = grid => grid.cells;

const buildEmptyGrid = () => {
  const grid = cloneDeep(Grid);
  for (let x = 0; x < grid.side; x++) {
    for (let y = 0; y < grid.side; y++) {
      grid.cells.push(cellModel.buildCell());
    }
  }
  connectNeighbours(grid);
  return grid;
};

const buildGrid = (data) => {
  if (!data) return buildEmptyGrid();
};

const getCell2d = (x, y, grid) => grid.cells[(x * grid.side) + y];
const updateCell2d = (x, y, grid, cell) => {
  const ngrid = cloneDeep(grid);
  ngrid[(x * ngrid.side) + y] = cellModel.updateCell(getCell2d(x, y, ngrid), cell);
  return ngrid;
};

const connectNeighbours = (grid) => {
  for (let x = 0; x < grid.cells.length; x++) {
    // connect up
    if (x >= grid.side) {
      grid.cells[x].connected.up = x - grid.side;
    }
    // connect down
    if (x < grid.cells.length - grid.side) {
      grid.cells[x].connected.down = x + grid.side;
    }
    // connect right
    if (((x + 1) % grid.side) !== 0) {
      grid.cells[x].connected.right = x + 1;
    }
    // connect left
    if (x % grid.side !== 0) {
      grid.cells[x].connected.left = x - 1;
    }
  }
  return grid;
};

module.exports = {
  buildGrid,
  getCells,
};
