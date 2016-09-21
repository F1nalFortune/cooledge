import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import store, { history } from './store';

ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('content')
);
