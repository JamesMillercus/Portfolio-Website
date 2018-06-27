import { combineReducers } from 'redux';
// import usersReducer
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
// combine all existing reducers
export default combineReducers({
	users: usersReducer,
	auth: authReducer,
	admins: adminsReducer
});