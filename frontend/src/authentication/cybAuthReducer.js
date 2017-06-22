import { Map, fromJS } from 'immutable';
import {
  AUTHENTICATE,
  LOGIN,
  LOGOUT,
  SHOW_LOGIN,
  SOCKET_RENEWED,
  HIDE_LOGIN,
 } from './cybAuthConstants';
import decodeProfile from './cybAuthToken';

const tokenKey = 'deckerToken';

const login = (state, data) => {
  const token = data.token;
  const profile = decodeProfile(token);
  localStorage.setItem(tokenKey, JSON.stringify(token));
  return state.merge(new Map(profile));
};

const logout = (state) => {
  localStorage.removeItem(tokenKey);
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
    case SHOW_LOGIN:
      return showLogin(state);
    case SOCKET_RENEWED:
      return socketRenewed(state);
    case HIDE_LOGIN:
      return hideLogin(state);
    case LOGIN:
      return login(state, action.data);
    case LOGOUT:
      return logout(state);
    default:
      return state;
  }
}

export default authReducer;
