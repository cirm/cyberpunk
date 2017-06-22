import {
  POPULATE_ONLINE,
  GET_ONLINE,
  USER_JOINED,
  USER_LEFT,
} from './cybSocialConstants';

export function getOnlineDeckers() {
  return {
    type: GET_ONLINE,
    meta: { remote: true },
  };
}

export function populateUserList(data) {
  return {
    type: POPULATE_ONLINE,
    data,
  };
}

export function userLogout(data) {
  return {
    type: USER_LEFT,
    data,
  };
}

export function userLogIn(data) {
  return {
    type: USER_JOINED,
    data,
  };
}
