import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import moment from 'moment';
import styles from './cybChatTextArea.styl';

moment.locale('et');

const renderChatBox = props => (
  <div ref={props.inputRef} className={styles.chatStyle} >
    {!props.chat === false ?
      props.chat.reverse().map(message => (
        <div className={styles.lineStyle} key={message.get('timestamp')} >
          <div className={styles.timeStamp} >
            {`[${moment(message.get('timestamp')).format('LTS')}]`}
          </div>
          {`<${message.get('decker')}> ${message.get('text')}`}
        </div>
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
