import React from 'react';
import PropTypes from 'prop-types';
import { HeaderContainer } from './cybHeader';
import styles from './cybApp.styl';

const App = props => (
  <div className={styles.cybApp} >
    <HeaderContainer className={styles.header} {...props} />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
