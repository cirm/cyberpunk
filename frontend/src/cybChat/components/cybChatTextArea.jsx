import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import moment from 'moment';
import styles from './cybChatTextArea.styl';

moment.locale('et');

const renderChatBox = props => (
  <div className={styles.chatStyle} >
    {!props.chat === false ?
      props.chat.reverse().map(message => (
        <p className={styles.lineStyle} key={message.get('timestamp')} >
          {`[${moment(message.get('timestamp')).format('LTS')}]
            <${message.get('decker')}> ${message.get('text')}`}
        </p>
      ))
      : null}
  </div>
);

renderChatBox.defaultProps = {
  chat: new List(),
};

renderChatBox.propTypes = {
  chat: ImmutablePropTypes.list,
};

export default renderChatBox;
