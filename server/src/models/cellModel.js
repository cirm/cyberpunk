// @flow
const cells = require('../data');

const cellTypes = new Map([
  [0, 'Black Ice'],
  [1, 'Firewall'],
  [2, 'Network Buffer'],
  [3, 'Node'],
]);

let counter: number = 400;
const ids: string[] = cells;

const getCleanCell = (): Cell => {
  const cell: Cell = {
    id: ids[counter],
    type: 3,
    visited: 0,
    lastTracker: '',
    connected: {},
  };
  counter -= 1;
  return cell;
};

const getTypedCell = (type: number): Cell => {
  const cell = getCleanCell();
  cell.type = type;
  return cell;
};

const buildCell = (cell: Cell = getCleanCell()): Cell => {
  if (cell.type && !cell.id) return getTypedCell(cell.type);
  return getCleanCell();
};

const visitCell = (cell: Cell, person: string): Cell => {
  const pure = Object.assign({}, cell);
  pure.visited = cell.visited + 1;
  pure.lastTracket = person;
  return pure;
};

module.exports = {
  buildCell,
  visitCell,
};
