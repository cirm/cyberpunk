import { Map, fromJS } from 'immutable';
import browserHistory from 'react-router/lib/browserHistory';
import { AUTHENTICATE, LOGIN, LOGOUT } from './cybAuthConstants';
import decodeProfile from './cybAuthToken';

const tokenKey = 'deckerToken';

const login1 = (state) => {
  console.log('wheee');
  return state;
};
const login = (state, data) => {
  const token = data.token;
  const profile = decodeProfile(token);
  localStorage.setItem(tokenKey, JSON.stringify(token));
  return state.merge(new Map(profile));
};

const logout = (state) => {
  localStorage.removeItem(tokenKey);
  browserHistory.push('/');
  return state.clear();
};

const getInitialState = (state = new Map()) => {
  const token = JSON.parse(localStorage.getItem(tokenKey));
  if (!token) {
    return state;
  }
  const profile = decodeProfile(token);
  return state.merge(new Map(profile))
    .set('needsRenew', true);
};

const socketRenewed = state => state.delete('needsRenew');

const showLogin = state => state.set('login', fromJS(true));
const hideLogin = state => state.set('login', false);

function authReducer(state = getInitialState(), action) {
  switch (action.type) {
    case 'SHOW_LOGIN':
      return showLogin(state);
    case 'SOCKET_RENEWED':
      return socketRenewed(state);
    case 'HIDE_LOGIN':
      return hideLogin(state);
    case AUTHENTICATE:
      return login1(state);
    case LOGIN:
      return login(state, action.data);
    case LOGOUT:
      return logout(state);
    default:
      return state;
  }
}

export default authReducer;
