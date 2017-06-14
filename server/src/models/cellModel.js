// @flow

const cloneDeep = require('lodash/fp/cloneDeep');
const cells = require('../data');

const cellTypes = new Map([[0, 'Black Ice'], [1, 'Firewall'], [2, 'Network Buffer'], [3, 'Node']]);

let counter = 400;
const ids = cells;

const getCleanCell = () => {
  const cell: Cell = {
    id: ids[counter],
    type: 3,
    visited: 0,
    lastTracker: '',
    connected: {},
  };
  counter--;
  return cell;
};

const getTypedCell = (type: number) => {
  const cell = getCleanCell();
  cell.type = type;
  return cell;
};

const buildCell = (cell: Cell) => {
  if (!cell) return getCleanCell();
  if (cell.type && !cell.id) return getTypedCell(cell.type);
};

const visitCell = (cell: Cell, person: string) => {
  const pure = cloneDeep(cell);
  pure.visited = cell.visited + 1;
  pure.lastTracket = person;
  return pure;
};

module.exports = {
  buildCell,
  visitCell,
};
