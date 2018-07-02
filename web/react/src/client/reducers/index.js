import { combineReducers } from 'redux';
// import usersReducer
import blankReducer from './blankReducer';
// combine all existing reducers
export default combineReducers({
	blank: blankReducer
});