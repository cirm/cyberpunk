import combineReducers from 'redux-immutable/dist/combineReducers';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form/immutable';
import profile from './authentication/cybAuthReducer';
import chat from './cybChat/cybChatReducer';
import social from './cybSocial/cybSocialReducer';
import grid from './cybGrid/cybGridReducer';
import game from './cybGame/cybGameReducer';

const reducers = combineReducers({
  form,
  grid,
  profile,
  chat,
  social,
  game,
  router,
});

export default reducers;
