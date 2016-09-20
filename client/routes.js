import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Items from './components/Items';
import Item from './components/Item';
import App from './containers/App';
import About from './components/About';
import Users from './components/Users';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { UserAuthWrapper } from 'redux-auth-wrapper';

const UserIsAuthenticated = UserAuthWrapper({
	authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: history.push,
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated'
});


export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Users} />
      <Route path="/login" component={Login} />
      <Route path='/dashboard' component={UserIsAuthenticated(Dashboard)} />
      <Route path="/about" component={About} />
      <Route path="/items" component={Items} />
      <Route path="/items/:id" component={Item} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
