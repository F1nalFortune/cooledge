import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import items from './items';
import filter from './filter';

const rootReducer = combineReducers({auth, filter, items, routing: routerReducer });


export default rootReducer;
