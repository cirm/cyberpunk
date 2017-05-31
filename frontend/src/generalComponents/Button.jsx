import React from 'react';
import styles from './Button.styl';

const button = props => (
  <button className={styles.button} onClick={props.onClick} >{props.children}</button>
);

export default button;
