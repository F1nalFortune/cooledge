import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Items from './components/Items';
import Item from './components/Item';
import App from './containers/App';
import About from './components/About';
import User from './components/User';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import Landing from './components/Landing';
import Register from './components/Register';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: history.push,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAuthenticated'
});


export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path='/dashboard' component={UserIsAuthenticated(Dashboard)} />
      <Route path="/dashboard/:id" component={UserIsAuthenticated(User)} />
      <Route path="/about" component={About} />
      <Route path="/items" component={Items} />
      <Route path="/items/:id" component={Item} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
