import { Map } from 'immutable';
import { createLogger } from 'redux-logger';
import createStore from 'redux/lib/createStore';
import applyMiddleware from 'redux/lib/applyMiddleware';
import reducers from './reducers';
import { socket } from './remote/cybRemoteSocketServer';
import { mapRemoteActions } from './remote/cybRemoteActionsListeners';
import remoteActionMiddleware from './remote/cybRemoteActionMiddleware';

const logger = createLogger({
  collapsed: false,
  stateTransformer: state => state.toJS(),
});
const middlewares = [];
middlewares.push(remoteActionMiddleware(socket));
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const initialState = new Map();

const createStoreWithMiddleware = applyMiddleware(
  ...middlewares,
)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

mapRemoteActions(socket, store);

export const getStore = () => store;
