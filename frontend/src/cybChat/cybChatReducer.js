import { List, fromJS } from 'immutable';
import {
  SEND_MESSAGE,
  GET_MESSAGE,
  SET_CHAT_HISTORY,
} from './cybChatConstants';

const updateMessages = (state, data) => {
  return state.insert(0, fromJS(data));
};
const updateMessages1 = (state, data) => state.insert(0, fromJS(data));

const setChatHistory = (state, data) => {
  if (data == null) return state;
  return state.merge(fromJS(data).reverse());
};

function chatReducer(state = new List(), action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return updateMessages(state, action.data);
    case GET_MESSAGE:
      return updateMessages1(state, action.data);
    case SET_CHAT_HISTORY:
      return setChatHistory(state, action.data);
    default:
      return state;
  }
}

export default chatReducer;
