import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/connect/connect';
import ChatContainer from '../cybChat/cybChatDashboard';
import LoginForm from '../authentication/cybFormLogin';
import styles from './cybDashboard.styl';

class MainDashboard extends React.PureComponent {
  displayLogin() {
    return this.props.loginState;
  }

  render() {
    return (
      <div className={styles.dashboardStyle} >
        {this.displayLogin() ? <LoginForm dispatch={this.props.dispatch} /> :
          <ChatContainer {...this.props} />}
      </div>);
  }
}

MainDashboard.propTypes = {
  profile: PropTypes.object,
  loginState: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    loginState: state.getIn(['profile', 'login']),
    socketProfile: state.getIn(['profile', 'socketProfile']),
    renewSocket: state.getIn(['profile', 'needsRenew']),
  };
}

const DashboardContainer = connect(
  mapStateToProps,
)(MainDashboard);

export default DashboardContainer;
