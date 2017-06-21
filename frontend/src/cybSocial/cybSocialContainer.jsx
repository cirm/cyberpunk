import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import { getOnlineDeckers } from './cybSocialActionsCreators';
import styles from './cybSocialDashboard.styl';


class SocialDashboard extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch(getOnlineDeckers());
  }

  render() {
    return (
      <div className={styles.socialContainer} >
        {this.props.deckers.size > 0 ? this.props.deckers.map(decker =>
          <p className={styles.entry}>{decker.get('decker')}</p>) :
          <p className={styles.entry}>No real deckers online :(</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deckers: state.get('social'),
  };
}

const SocialDashBoardContainer = connect(
  mapStateToProps,
)(SocialDashboard);

export default SocialDashBoardContainer;
