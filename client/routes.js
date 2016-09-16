import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Items from './components/Items';
import Item from './components/Item';
import App from './containers/App';
import About from './components/About';
import Users from './components/Users';
import NotFound from './components/NotFound';


export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Users} />
      <Route path="/about" component={About} />
      <Route path="/items" component={Items} />
      <Route path="/items/:id" component={Item} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
