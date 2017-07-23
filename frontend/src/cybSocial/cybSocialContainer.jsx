import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import { getOnlineDeckers } from './cybSocialActionsCreators';
import styles from './cybSocialDashboard.styl';


class SocialDashboard extends React.PureComponent {
  componentDidMount() {
    if (!this.props.renew) {
      this.props.dispatch(getOnlineDeckers());
    }
  }

  render() {
    return (
      <div className={styles.socialContainer} >
        {this.props.deckers.size > 0 ? this.props.deckers.map(decker =>
          <p className={styles.entry}>{decker.get('username')}</p>) :
          <p className={styles.entry}>No real deckers online :(</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deckers: state.get('social'),
    renew: state.getIn(['profile', 'needsRenew']),
  };
}

const SocialDashBoardContainer = connect(
  mapStateToProps,
)(SocialDashboard);

export default SocialDashBoardContainer;
