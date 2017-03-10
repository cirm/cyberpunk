import React from 'react';
import ReactDOM from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import Provider from 'react-redux/lib/components/Provider';
import DashboardContainer from './app/cybDashboard.jsx';
import App from './app/cybApp.jsx';
import { getStore } from './store';
import { AppContainer } from 'react-hot-loader';

const store = getStore();

const routes = (<Route component={App} >
  <Route path="/" component={DashboardContainer} />
</Route>);
// onEnter={requireAuth}

const requireAuth = (nextState, replace) => {
  if (!store.getState().getIn(['profile', 'display'])) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} >
        <Router history={browserHistory} >{routes}</Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
};

render();

if (module.hot) {
  module.hot.accept('./app/cybApp', () => {
    render()
  });
}
