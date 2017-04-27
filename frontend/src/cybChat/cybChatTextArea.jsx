import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './cybChatTextArea.styl';

moment.locale('et');

const renderChatBox = (props) => (
  <div className={styles.chatStyle} >
    {!props.chat === false ?
      props.chat.reverse().map(message => (
        <div className={styles.lineStyle} key={message.get('timestamp')} >
          {`[${moment(message.get('timestamp')).format('LTS')}]
            <${message.get('decker')}> ${message.get('text')}`}
        </div>
      ))
      : null}
  </div>
);


renderChatBox.propTypes = {};

export default renderChatBox;
