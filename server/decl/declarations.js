// @flow

type Cell = {
  pos: number,
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
  cells: Array<Cell>,
};

type Socket = {
  emit(event: string): void
}

type User = {
  userId: string,
  username: string,
  socket: Socket,
}
