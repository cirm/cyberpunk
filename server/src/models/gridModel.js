// @flow

const cloneDeep = require('lodash/fp/cloneDeep');
const cellModel = require('./cellModel');

let gameGrid: Grid = {
  side: 20,
  cells: [],
};

const connectNeighbours = async (baseGrid: Grid): Promise<Grid> => {
  const grid: Grid = cloneDeep(baseGrid);
  for (let x = 0; x < grid.cells.length; x += 1) {
    if (!grid.cells[x].connected) {
      grid.cells[x].connected = {};
    }
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

const buildEmptyGrid = async (raw: Grid = { side: 20, cells: [] }): Promise<Grid> => {
  const grid: Grid = { side: raw.side, cells: [] };
  for (let x = 0; x < grid.side; x += 1) {
    for (let y = 0; y < grid.side; y += 1) {
      grid.cells.push(cellModel.buildCell(raw.cells[(x * raw.side) + y], (x * raw.side) + y));
    }
  }
  const connectedGrid = await connectNeighbours(grid);
  return connectedGrid;
};

const createGrid = async (data: ?Cell[]): Promise<Grid> => {
  if (gameGrid.cells.length > 0) return gameGrid;
  if (!data) {
    gameGrid = await buildEmptyGrid();
  } else if (data.length > 0 && (data.length % Math.sqrt(data.length) === 0)) {
    gameGrid = await buildEmptyGrid({ side: Math.sqrt(data.length), cells: data });
  }

  return gameGrid;
};

const updateState = (cellPos: number, decker: string): Grid => {
  const ngrid: Grid = cloneDeep(gameGrid);
  ngrid.cells[cellPos] = cellModel.visitCell(ngrid.cells[cellPos], decker);
  gameGrid = ngrid;
  return gameGrid;
};

const resetGrid = (): void => {
  gameGrid = { side: 20, cells: [] };
};

const getState = (): Grid => gameGrid;

module.exports = {
  createGrid,
  getState,
  updateState,
  resetGrid,
};
