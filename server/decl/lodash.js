
// @flow

type AnyArrayType<V> = Array<V> | $ReadOnlyArray<V>;
type CollectionType<V> = AnyArrayType<V> | {+[key: any]: V};
type JsonType =
  | string
  | number
  | boolean
  | AnyArrayType<any>
  | {+[key: string]: any};

  type MatchesIterateeType<K: string> = {+[key: K]: any};
  type MatchesPropertyIterateeType<K: string | number> = [K, any];
  type IterateeType<V, K: string | number = string | number, R = any> =
    | ((val: V) => R)
    | MatchesIterateeType<K>
    | MatchesPropertyIterateeType<K>
    | string
    | number;

  type PredicateType<
    V,
    K: string | number = string,
    R: boolean = *,
  > = IterateeType<V, K, R>;

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
 declare function cloneDeep<V, C: CollectionType<V>>(
   col: ?C
 ): C;
}
