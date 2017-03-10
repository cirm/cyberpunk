import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/connect/connect';
import PureComponent from '../lib/PureComponent';
import ChatContainer from '../cybChat/cybChatDashboard.jsx';
import LoginForm from '../authentication/cybFormLogin.jsx';

class MainDashboard extends PureComponent {
  displayLogin() {
    return this.props.loginState;
  }

  render() {
    return (
      <div >
        <div >{this.displayLogin() ? <LoginForm {...this.props} /> :
          <ChatContainer {...this.props} />}</div>
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
