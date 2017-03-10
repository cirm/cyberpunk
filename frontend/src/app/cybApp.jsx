import React, { PropTypes } from 'react';
import { HeaderContainer } from './cybHeader.jsx';
import styles from './cybApp.styl';
import DeckerList from '../cybSocial/cybSocialDashboard.jsx';

const App = (props) => (
    <div className={styles.global}>
      <div className={styles.header}><HeaderContainer {...props} /></div>
      <div className={styles.container}>
        <div className={styles.body_left}>
          {props.children}
        </div>
        <div className={styles.body_right}>
          <DeckerList {...props} />
        </div>
      </div>
    </div>
);

App.propTypes = {
  children: PropTypes.object,
  drawerState: PropTypes.object,
};

export default App;
