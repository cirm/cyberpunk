import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './cybChatTextArea.styl';

moment.locale('et');

const lineStyle = {
  color: '#28FC91',
  height: '1em',
  margin: 5,
  'margin-left': '1em',
};

const renderChatBox = (props) => (
  <div className={styles.chatStyle} >
    {!props.chat === false ?
      props.chat.reverse().map(message => (
        <p style={lineStyle} key={message.get('timestamp')} >
          {`[${moment(message.get('timestamp')).format('LTS')}]
            <${message.get('decker')}> ${message.get('text')}`}
        </p>
      ))
      : null}
  </div>
);


renderChatBox.propTypes = {};

export default renderChatBox;
