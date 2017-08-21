import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/lib/components/Provider';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import App from './app/cybApp';
import { getStore, history } from './store';
import DashboardContainer from './app/cybDashboard';
import { GridContainer } from './cybGrid/cybGridDashboard';
import { GameContainer } from './cybGame/cybGameDashboard';

require('./fonts/ahamono.styl');

const store = getStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component>
            <Route path="/" exact component={DashboardContainer} />
            <Route path="/grid" exact component={GridContainer} />
            <Route path="/game" exact component={GameContainer} />
          </Component>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app/cybApp', () => {
    render();
  });
}
