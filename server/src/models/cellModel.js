const cloneDeep = require('lodash/fp/cloneDeep');
const cells = require('../data');

const cellTypes = {
  1: 'Black Ice',
  2: 'Firewall',
  3: 'Network Buffer',
  4: 'Node',
};

const Cell = {
  id: '',
  type: '',
  visited: 0,
  lastTracker: '',
  connected: {},
};
let counter = 400;
const ids = cells;

const getCleanCell = () => {
  const cell = cloneDeep(Cell);
  cell.type = 3;
  cell.id = ids[counter];
  counter--;
  return cell;
};

const getTypedCell = (type) => {
  const cell = getCleanCell();
  cell.type = type;
  return cell;
};

const buildCell = (cell) => {
  if (!cell) return getCleanCell();
  if (cell.type && !cell.id) return getTypedCell(cell.type);
};

const visitCell = (cell, person) => {
  const pure = cloneDeep(cell);
  pure.visited = cell.visited + 1;
  pure.lastTracket = person;
};

module.exports = {
  buildCell,
  visitCell,
};
