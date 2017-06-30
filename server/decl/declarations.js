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

type AnyArrayType<V> = Array<V> | $ReadOnlyArray<V>;

declare module 'lodash/fp' {
  /* Array */
declare function reduce<A, V>(
  iteratee: (acc: A, value: V) => A,
  ...rest: Array<void>
): (acc: A, ...rest: Array<void>) => (col: ?AnyArrayType<V>) => A;
declare function reduce<A, V>(
  iteratee: (acc: A, value: V) => A,
  acc: A,
  ...rest: Array<void>
): (col: ?AnyArrayType<V>) => A;
declare function reduce<A, V>(
  iteratee: (acc: A, value: V) => A,
  acc: A,
  col: ?AnyArrayType<V>,
): A;
declare function range(
   start: number,
   ...rest: Array<void>
 ): (end: number) => Array<number>;
 declare function range(start: number, end: number): Array<number>;
}
