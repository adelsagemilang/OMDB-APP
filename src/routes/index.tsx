import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Pages
import Home from 'pages/home';
import Detail from 'pages/detail';

// Commons Component
import NotFound from 'components/routes/404';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/movie/:imdbID',
    component: Detail,
  },
];

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        {routes.map(route => (
          <Route
            exact
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
        <Route path="/404" component={NotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    );
  }
}
