import combineReducers from 'redux-immutable/dist/combineReducers';
import { reducer as form } from 'redux-form/immutable';
import profile from './authentication/cybAuthReducer';
import chat from './cybChat/cybChatReducer';
import social from './cybSocial/cybSocialReducer';
import grid from './cybGrid/cybGridReducer';

const reducers = combineReducers({
  form,
  grid,
  profile,
  chat,
  social,
});

export default reducers;
