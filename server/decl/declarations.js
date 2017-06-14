// @flow

type Cell = {
  id: string,
  type: number,
  visited: number,
  lastTracker: string,
  connected: {
    up?: number,
    down?: number,
    left?: number,
    right?: number,
  }
};

type Grid = {
  side: number,
  cells: Cell[],
};
