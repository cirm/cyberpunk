import combineReducers from 'redux-immutable/dist/combineReducers';
import { reducer as form } from 'redux-form/immutable';
import profile from './authentication/cybAuthReducer';
import chat from './cybChat/cybChatReducer';

const reducers = combineReducers({
  form,
  profile,
  chat,
});

export default reducers;
