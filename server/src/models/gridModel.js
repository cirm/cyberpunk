// @flow

const cloneDeep = require('lodash/fp/cloneDeep');
const _ = require('lodash');
const fd = require('lodash/fp');
const cellModel = require('./cellModel');

let gridHistory: Grid[] = [];

let gameGrid: Grid = {
  side: 20,
  cells: [],
};

const functionalConnect = (baseGrid: Grid): Grid =>
  _.reduce(baseGrid.cells, (result: Grid, value: Cell, key: number): Grid => {
    // connect up
    if (key >= baseGrid.side) {
      value.connected.up = key - baseGrid.side;
    }
    // connect down
    if (key < baseGrid.cells.length - baseGrid.side) {
      value.connected.down = key + baseGrid.side;
    }
    // connect right
    if (((key + 1) % baseGrid.side) !== 0) {
      value.connected.right = key + 1;
    }
    // connect left
    if (key % baseGrid.side !== 0) {
      value.connected.left = key - 1;
    }
    result.cells.push(value);
    return result;
  }, { side: baseGrid.side, cells: [] });

const updateGridHistory = (grid: Grid): Grid => {
  gridHistory.push(grid);
  return grid;
};

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const buildGrid = (raw: Grid): Grid => {
  const grid = { side: raw.side, cells: raw.cells };
  if (raw.cells.length === 0) {
    grid.cells = _.times(grid.side * grid.side).reduce((result, val) => {
      result.push(cellModel.buildCell(raw.cells[val], val))
      return result;
    }, []);
  } else {
    grid.cells = _.times(grid.cells.length).reduce((result, val) => {
      result.push(cellModel.buildCell(grid.cells[val], val))
      return result;
    }, [])
  }
  return grid;
};

const getGrid = (raw: Grid = { side: 20, cells: [] }): Grid =>
  compose(updateGridHistory, functionalConnect, buildGrid)(raw);

const createGrid = (data: ?Cell[]): Grid => {
  if (gameGrid.cells.length > 0) return gameGrid;
  if (!data) {
    gameGrid = getGrid();
  } else if (data.length > 0 && (data.length % Math.sqrt(data.length) === 0)) {
    gameGrid = getGrid({ side: Math.sqrt(data.length), cells: data });
  }
  return gameGrid;
};

const updateState = (cellPos: number, decker: string): Grid => {
  const ngrid: Grid = cloneDeep(gameGrid);
  ngrid.cells[cellPos] = cellModel.visitCell(ngrid.cells[cellPos], decker);
  gameGrid = ngrid;
  updateGridHistory(gameGrid);
  return gameGrid;
};

const resetGrid = (): void => {
  gameGrid = { side: 20, cells: [] };
  gridHistory = [];
};

const getState = (): Grid => gameGrid;

const getHistory = (): Grid[] => gridHistory;

module.exports = {
  createGrid,
  getState,
  updateState,
  resetGrid,
  getHistory,
};
