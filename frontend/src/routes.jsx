import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardContainer from './app/cybDashboard';
import { GridContainer } from './cybGrid/cybGridDashboard';

const routes = () => (
  <Switch>
    <Route path="/" exact component={DashboardContainer} />
    {/* If none of those match, then a sibling `Miss` will render. */}
    <Route path="/grid" exact component={GridContainer} />
  </Switch>);


export default routes;
