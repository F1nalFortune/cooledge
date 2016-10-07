import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import items from './items';
import filter from './filter';
import userSchool from './userSchool';

const rootReducer = combineReducers({auth, filter, items, userSchool, routing: routerReducer });


export default rootReducer;
