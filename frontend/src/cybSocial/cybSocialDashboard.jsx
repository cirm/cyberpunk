import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/connect/connect';
import PureComponent from '../lib/PureComponent';
import { getOnlineDeckers } from './cybSocialActionsCreators';
import styles from './cybSocialDashboard.styl';


class SocialDashboard extends PureComponent {
  componentWillMount() {
    return this.props.dispatch(getOnlineDeckers())
  }

  render() {
    return (
      <div className={styles.body_right}><p>oglaf</p></div>
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
