import React, { PropTypes } from 'react';
import { HeaderContainer } from './cybHeader.jsx';
import styles from './cybApp.styl';
import DeckerList from '../cybSocial/cybSocialDashboard.jsx';

const App = (props) => (
  <div className={styles.global} >
    <HeaderContainer className={styles.header} {...props} />
    <div className={styles.body} >
      <div className={styles.body_left} >
        {props.children}
      </div>
      <DeckerList {...props} />
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object,
  drawerState: PropTypes.object,
};

export default App;
