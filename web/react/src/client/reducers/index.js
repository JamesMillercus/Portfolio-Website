import { combineReducers } from 'redux';
// import usersReducer
import userAgentReducer from './userAgentReducer';
import scrolledItemReducer from './scrolledItemReducer';
// combine all existing reducers
export default combineReducers({
	userAgent: userAgentReducer,
	scrolledItem: scrolledItemReducer
});