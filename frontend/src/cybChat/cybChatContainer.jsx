import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChatInput from './components/cybChatInput';
import CybChat from './components/cybChatTextArea';
import styles from './cybChatContainer.styl';


const chatContainer = props => (
  <div className={styles.chatContainer} >
    <CybChat chat={props.chat} />
    <ChatInput display={props.display} />
  </div>
);

chatContainer.defaultProps = {
  display: '',
  chat: new List(),
};

chatContainer.propTypes = {
  chat: ImmutablePropTypes.list,
  display: PropTypes.string,
};

export default chatContainer;
