import React from 'react';
import styles from './cybGridLine.styl';
import { Cell } from './cybGridCell';

export const Line = props => (
  <div key={props.line} className={styles.line} >{
    props.cells.map((cell) => (
      <Cell id={cell.get('id')} visited={cell.get('visited')} pos={cell.get('pos')} />
    ))}
  </div >
);
