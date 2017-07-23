import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.styl';

const button = props => (
  <button className={styles.button} onClick={props.onClick} >{props.children}</button>
);

button.defaultProps = {
  onClick: () => undefined,
  children: 'button',
};

button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default button;
