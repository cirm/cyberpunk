import {
  AUTHENTICATE,
  LOGOUT,
  LOGIN,
  SHOW_LOGIN,
  HIDE_LOGIN,
  SOCKET_REFRESH,
  SOCKET_RENEWED,
} from './cybAuthConstants';

export function authenticateUser(userData) {
  return {
    meta: { auth: true },
    type: AUTHENTICATE,
    data: userData,
  };
}

export function logoutUser(data) {
  return {
    meta: { decker: true },
    type: LOGOUT,
    data,
  };
}

export function displayLogin() {
  return {
    type: SHOW_LOGIN,
  };
}

export function hideLogin() {
  return {
    type: HIDE_LOGIN,
  };
}

export function login(userToken) {
  return {
    type: LOGIN,
    data: userToken,
  };
}

export function socketRefresh() {
  return {
    type: SOCKET_REFRESH,
    meta: { decker: true },
  };
}

export function socketRenewed() {
  return {
    type: SOCKET_RENEWED,
  };
}
