import React from 'react';
import ReactDOM from 'react-dom';
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
    if (this.props.renewSocket) {
      this.props.dispatch(socketRefresh());
    }
    return this.props.dispatch(getChatHistory());
  }

  componentWillUpdate(nextProps) {
    this.historyChanged = nextProps.chat.size !== this.props.chat.size;
    if (this.historyChanged) {
      const chat = this.cybChatTextArea;
      const scrollPos = chat.scrollTop;
      const scrollBottom = (chat.scrollHeight - chat.clientHeight);
      this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);
      if (!this.scrollAtBottom) {
        const numMessages = chat.childNodes.length;
        this.topMessage = numMessages === 0 ? null : chat.childNodes[0];
      }
    }
  }

  componentDidUpdate() {
    if (this.historyChanged) {
      if (this.scrollAtBottom) {
        this.scrollToBottom();
      }
      if (this.topMessage) {
        this.topMessage.scrollIntoView();
      }
    }
  }


  scrollToBottom() {
    const chat = this.cybChatTextArea;
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    return (
      <div className={styles.chat} >
        <ChatContainer
          chat={this.props.chat}
          display={this.props.display}
          inputRef={(el) => { this.cybChatTextArea = el; }}
        />
        <SocialConatiner {...this.props} />
      </div>
    );
  }
}

ChatDashboard.defaultProps = {
  display: '',
  chat: new List(),
  renewSocket: false,
};

ChatDashboard.propTypes = {
  renewSocket: PropTypes.bool,
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
