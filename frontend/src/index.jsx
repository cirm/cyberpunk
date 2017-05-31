import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Provider from 'react-redux/lib/components/Provider';
import { AppContainer } from 'react-hot-loader';
import App from './app/cybApp';
import { getStore } from './store';
import Routes from './routes';

require('./fonts/ahamono.styl');

const store = getStore();

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Provider store={store} >
          <Component>
            <Routes />
          </Component>
        </Provider>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('app'),
  );

render(App);

if (module.hot) {
  module.hot.accept('./app/cybApp', () => {
    render();
  });
}
