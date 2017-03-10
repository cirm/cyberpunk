import { AUTHENTICATE, LOGOUT, LOGIN } from './cybAuthConstants';

export function authenticateUser(userData) {
  return {
    meta: { auth: true },
    type: AUTHENTICATE,
    data: userData,
  };
}

export function logoutUser() {
  return {
    meta: { decker: true },
    type: LOGOUT,
  };
}

export function displayLogin() {
  return {
    type: 'SHOW_LOGIN',
  };
}

export function hideLogin() {
  return {
    type: 'HIDE_LOGIN',
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
    type: 'SOCKET_REFRESH',
    meta: { decker: true },
  };
}

export function socketRenewed() {
  return {
    type: 'SOCKET_RENEWED',
  };
}
