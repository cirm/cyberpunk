import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import ChatContainer from './cybChatContainer';
import SocialConatiner from '../cybSocial/cybSocialContainer';
import { getChatHistory } from './cybActionCreators';
import { socketRefresh } from '../authentication/cybAuthActionCreators';
import styles from './cybChatDashboard.styl';


class ChatDashboard extends React.PureComponent {
  componentWillMount() {
    if (!!this.props.renewSocket) {
      this.props.dispatch(socketRefresh());
    }
    return this.props.dispatch(getChatHistory());
  }

  render() {
    return (
      <div className={styles.chat} >
        <ChatContainer chat={this.props.chat} display={this.props.display} />
        <SocialConatiner {...this.props} />
      </div>
    );
  }
}

ChatDashboard.defaultProps = {
  display: '',
  chat: new List(),
};

ChatDashboard.propTypes = {
  display: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  chat: ImmutablePropTypes.list,
};

function mapStateToProps(state) {
  return {
    chat: state.get('chat'),
    display: state.getIn(['profile', 'username']),
  };
}

const ChatDashboardContainer = connect(
  mapStateToProps,
)(ChatDashboard);

export default ChatDashboardContainer;
