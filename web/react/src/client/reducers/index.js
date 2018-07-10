import { combineReducers } from 'redux';
// import usersReducer
import userAgentReducer from './userAgentReducer';
import scrolledItemReducer from './scrolledItemReducer';
import activeItemReducer from './activeItemReducer';
import clickedItemsReducer from './clickedItemsReducer';
// combine all existing reducers
export default combineReducers({
	userAgent: userAgentReducer,
	scrolledItem: scrolledItemReducer,
	activeItem: activeItemReducer,
	clickedItems: clickedItemsReducer
});