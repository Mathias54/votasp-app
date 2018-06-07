import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import Auth0 from './Auth0/Auth0';
import Auth0Callback from './Auth0/Auth0.callback';
import renderAuthenticated from './Auth0/renderAuthenticated';

import Home from './Home/Home';
import Results from './Results/Results';
import history from './history';

export const makeMainRoutes = () => {
  const auth = new Auth0();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' render={(props) => renderAuthenticated(Home, props)} />
        <Route exact path='/callback' render={(props) => <Auth0Callback auth={auth} {...props} />} />
        <Route exact path='/results' render={props => <Results {...props} />} />
      </Switch>
    </Router>
  );
};
