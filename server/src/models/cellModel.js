// @flow

const cloneDeep = require('lodash/fp/cloneDeep');
const cells = require('../data');

const cellTypes = new Map([
  [0, 'Black Ice'],
  [1, 'Firewall'],
  [2, 'Network Buffer'],
  [3, 'Node'],
]);

const ids: string[] = cells;

const getCleanCell = (pos: number): Cell => {
  const cell: Cell = {
    pos,
    id: ids[pos],
    type: 3,
    visited: 0,
    lastTracker: '',
    connected: {},
  };
  return cell;
};

const buildCell = (cell: Cell, pos: number): Cell => {
  const raw = getCleanCell(pos);
  if (cell && cell.type) raw.type = cell.type;
  return raw;
};

const visitCell = (cell: Cell, person: string): Cell => {
  const pure = cloneDeep(cell);
  pure.visited = cell.visited + 1;
  pure.lastTracker = person;
  return pure;
};

module.exports = {
  buildCell,
  visitCell,
};
