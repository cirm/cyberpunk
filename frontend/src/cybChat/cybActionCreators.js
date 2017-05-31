import {
  SEND_MESSAGE,
  GET_MESSAGE,
  GET_CHAT_HISTORY,
  SET_CHAT_HISTORY,
} from './cybChatConstants';

export function sendMessage(data) {
  return {
    meta: { auth: true },
    type: SEND_MESSAGE,
    data,
  };
}

export function getMessage(data) {
  return {
    type: GET_MESSAGE,
    data,
  };
}

export function getChatHistory() {
  return {
    type: GET_CHAT_HISTORY,
    meta: { remote: true },
  };
}

export function setChatHistory(data) {
  return {
    type: SET_CHAT_HISTORY,
    data,
  };
}
