import { combineReducers } from 'redux';
import { tokenRequest } from '../actions';

const rootReducer = combineReducers({
  tokenRequest,
  // reducer2,
});

export default rootReducer;
