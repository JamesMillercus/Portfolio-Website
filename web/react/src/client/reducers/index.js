import { combineReducers } from 'redux';
// import usersReducer
import userAgentReducer from './userAgentReducer';
import scrolledItemReducer from './scrolledItemReducer';
import activeItemReducer from './activeItemReducer';
import clickedItemsReducer from './clickedItemsReducer';
import activeHeroIconReducer from './activeHeroIconReducer';
import deviceTypeReducer from './deviceTypeReducer';
import heroTextAnimationReducer from './heroTextAnimationReducer';
// combine all existing reducers
export default combineReducers({
	userAgent: userAgentReducer,
	scrolledItem: scrolledItemReducer,
	activeItem: activeItemReducer,
	clickedItems: clickedItemsReducer,
	activeHeroIcon: activeHeroIconReducer,
	deviceType: deviceTypeReducer,
	heroTextAnimation: heroTextAnimationReducer
});
