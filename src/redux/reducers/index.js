import { combineReducers } from 'redux';
import { tokenRequest } from '../actions';
import { player } from './player';

const rootReducer = combineReducers({
  tokenRequest,
  player,
});

export default rootReducer;
