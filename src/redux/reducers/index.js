import { combineReducers } from 'redux';
import { tokenRequest } from '../actions';
import { user } from './user';

const rootReducer = combineReducers({
  tokenRequest,
  user,
});

export default rootReducer;
