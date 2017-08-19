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


export class GameDashboard extends React.PureComponent {
  render() {
    return (
      <div >
        Halo
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    display: state.getIn(['profile', 'username']),
  };
}


export const GameContainer = connect(
  mapStateToProps,
)(GameDashboard);
