// @flow

const _cloneDeep = require('lodash/fp/cloneDeep');
const _reduce = require('lodash/fp/reduce');
const _range = require('lodash/fp/range');
const _ = require('lodash');
const fd = require('lodash/fp');
const cellModel = require('./cellModel');

let gridHistory: Grid[] = [];

let gameGrid: Grid = {
  side: 20,
  cells: [],
};

const functionalConnect = (baseGrid: Grid): Grid =>
  _reduce((result: Grid, value: Cell): Grid => {
    // connect up
    if (value.pos >= baseGrid.side) {
      value.connected.up = value.pos - baseGrid.side;
    }
    // connect down
    if (value.pos < baseGrid.cells.length - baseGrid.side) {
      value.connected.down = value.pos + baseGrid.side;
    }
    // connect right
    if (((value.pos + 1) % baseGrid.side) !== 0) {
      value.connected.right = value.pos + 1;
    }
    // connect left
    if (value.pos % baseGrid.side !== 0) {
      value.connected.left = value.pos - 1;
    }
    result.cells.push(value);
    return result;
  }, { side: baseGrid.side, cells: [] })(baseGrid.cells);

const updateGridHistory = (grid: Grid): Grid => {
  gridHistory.push(grid);
  return grid;
};

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const buildGrid = (raw: Grid): Grid => {
  const grid: Grid = { side: raw.side, cells: raw.cells };
  if (raw.cells.length === 0) {
    grid.cells = _reduce((result: Cell[], val: number): Cell[] => {
      result.push(cellModel.buildCell(grid.cells[val], val));
      return result;
    }, [])(_range(0)(grid.side * grid.side));
  } else {
    grid.cells = _reduce((result: Cell[], val: number): Cell[] => {
      result.push(cellModel.buildCell(raw.cells[val], val));
      return result;
    }, [])(_range(0)(grid.cells.length));
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
  const ngrid: Grid = _cloneDeep(gameGrid);
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
