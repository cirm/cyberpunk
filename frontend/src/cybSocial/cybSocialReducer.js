import { Set, fromJS } from 'immutable';
import decodeProfile from '../authentication/cybAuthToken';
import {
  POPULATE_ONLINE,
  USER_JOINED,
  USER_LEFT,
} from './cybSocialConstants';
import {
  LOGIN,
  LOGOUT,
} from '../authentication/cybAuthConstants';

const updateUsers = (state, data) => new Set(fromJS(data));

const userJoined = (state, data) => state.add(fromJS(data));

const userLeft = (state, data) => state.filter(decker => decker.get('username') !== data.username);

const pushSelf = (state, data) => {
  const profile = decodeProfile(data.token);
  return state.add(fromJS({ username: profile.username, id: profile.id }));
};

function socialReducer(state = new Set(), action) {
  switch (action.type) {
    case POPULATE_ONLINE:
      return updateUsers(state, action.data);
    case USER_JOINED:
      return userJoined(state, action.data);
    case USER_LEFT:
      return userLeft(state, action.data);
    case LOGIN:
      return pushSelf(state, action.data);
    case LOGOUT:
      return userLeft(state, action.data);
    default:
      return state;
  }
}

export default socialReducer;
