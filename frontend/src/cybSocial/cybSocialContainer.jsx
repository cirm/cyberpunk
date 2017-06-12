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
      <div className={styles.socialContainer} ><p>oglaf</p></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deckers: state.getIn(['social', 'deckers']),
  };
}

const SocialDashBoardContainer = connect(
  mapStateToProps,
)(SocialDashboard);

export default SocialDashBoardContainer;
