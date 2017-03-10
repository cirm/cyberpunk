import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/connect/connect';
import PureComponent from '../lib/PureComponent';
import ChatInput from './cybChatInput.jsx';
import ChatTextArea from './cybChatTextArea.jsx';
import { getChatHistory } from './cybActionCreators';
import { socketRefresh } from '../authentication/cybAuthActionCreators';


class ChatDashboard extends PureComponent {
  componentWillMount() {
    if (!!this.props.renewSocket) {
      this.props.dispatch(socketRefresh());
    }
    return this.props.dispatch(getChatHistory());
  }

  render() {
    return (
      <div >
        <div>
          <ChatTextArea {...this.props} />
        </div>
        <div>
          <ChatInput {...this.props} />
        </div>
      </div>
    );
  }
}

ChatDashboard.propTypes = {
  focus: PropTypes.object,
  domains: PropTypes.object,
  provinces: PropTypes.object,
  createMenu: PropTypes.object,
  dispatch: PropTypes.func,
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
