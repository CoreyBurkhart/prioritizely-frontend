import { combineReducers } from 'redux';
import app from './app';
import lists from './lists';

export default combineReducers({
  app,
  lists,
});
