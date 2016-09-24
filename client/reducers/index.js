import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import items from './items';

const rootReducer = combineReducers({
	auth, 
	routing: routerReducer,
	items
});

export default rootReducer;
