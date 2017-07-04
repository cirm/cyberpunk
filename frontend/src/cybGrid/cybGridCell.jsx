import React from 'react';
import styles from './cybGridCell.styl';

export const Cell = (props) => (
  <div className={styles.cell} key={props.id} >{props.id}</div >
);