import { combineReducers } from 'redux';
// import usersReducer
import userAgentReducer from './userAgentReducer';
// combine all existing reducers
export default combineReducers({
	userAgent: userAgentReducer
});