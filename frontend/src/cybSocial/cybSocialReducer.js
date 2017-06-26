import { List, fromJS, Map } from 'immutable';
import {
  POPULATE_ONLINE,
  USER_JOINED,
  USER_LEFT,
} from './cybSocialConstants';
import {
  LOGOUT,
} from '../authentication/cybAuthConstants'

const updateUsers = (state, data) => new List(fromJS(data));

const userJoined = (state, data) => state.push(fromJS(data));

const userLeft = (state, data) => state.filter(decker => decker.get('username') !== data.username);

function socialReducer(state = new List(), action) {
  switch (action.type) {
    case POPULATE_ONLINE:
      return updateUsers(state, action.data);
    case USER_JOINED:
      return userJoined(state, action.data);
    case USER_LEFT:
      return userLeft(state, action.data);
    case LOGOUT:
      return userLeft(state, action.data);
    default:
      return state;
  }
}

export default socialReducer;
