import mapValues from 'lodash/mapValues';
import { login, logoutUser, socketRenewed } from '../authentication/cybAuthActionCreators';
import { getMessage, setChatHistory } from '../cybChat/cybActionCreators';
import { populateUserList, userLogout, userLogIn } from '../cybSocial/cybSocialActionsCreators';
import { populateGridData } from '../cybGrid/cybGridActionCreators';

const remoteActionsMap = {
  TOKEN: login,
  ERROR: logoutUser,
  LOGOUT: logoutUser,
  GET_MESSAGE: getMessage,
  SET_CHAT_HISTORY: setChatHistory,
  SOCKET_RENEWED: socketRenewed,
  USER_LIST: populateUserList,
  USER_LOGIN: userLogIn,
  USER_LOGOUT: userLogout,
  GRID_DATA: populateGridData,
};

export const mapRemoteActions = (socket, store) =>
  mapValues(remoteActionsMap, (value, key) =>
    socket.on(key, data =>
      store.dispatch(value(data))));
