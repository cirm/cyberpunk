// @flow
const cellModel = require('./cellModel');

let gameGrid: Grid;

const getCell2d = (x: number, y: number, grid: Grid): Cell => grid.cells[(x * grid.side) + y];

const updateCell2d = (x: number, y: number, grid: Grid, person: string): Grid => {
  const ngrid: Grid = Object.assign({}, grid);
  ngrid[(x * ngrid.side) + y] = cellModel.visitCell(getCell2d(x, y, ngrid), person);
  return ngrid;
};

const connectNeighbours = async(baseGrid: Grid): Promise < Grid > => {
  const grid: Grid = Object.assign({}, baseGrid);
  for (let x = 0; x < grid.cells.length; x += 1) {
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

const buildEmptyGrid = async(raw: Grid = { side: 20, cells: [] }): Promise < Grid > => {
  const grid: Grid = raw;
  for (let x = 0; x < grid.side; x += 1) {
    for (let y = 0; y < grid.side; y += 1) {
      grid.cells.push(cellModel.buildCell());
    }
  }
  await connectNeighbours(grid);
  return grid;
};

const buildGrid = async(data: ? Cell[]): Promise < Grid > => {
  if (!data) return buildEmptyGrid();
  return gameGrid;
};

const updateState = (): Grid => gameGrid;

const getState = (): Grid => gameGrid;

const createGrid = async(grid: Promise < Grid > = buildGrid()): Grid => {
  gameGrid = grid;
  return gameGrid;
};

module.exports = {
  createGrid,
  getState,
  updateState,
  gameGrid,
};
