import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardContainer from './app/cybDashboard';

const routes = () => (
  <Switch>
    <Route path="/" exact component={DashboardContainer} />
    {/* If none of those match, then a sibling `Miss` will render. */}
  </Switch>);


export default routes;
