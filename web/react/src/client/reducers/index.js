import { combineReducers } from 'redux';
// import usersReducer
import userAgentReducer from './userAgentReducer';
import scrolledItemReducer from './scrolledItemReducer';
import activeItemReducer from './activeItemReducer';
import clickedItemsReducer from './clickedItemsReducer';
import activeHeroIconReducer from './activeHeroIconReducer';
import scrolledHeroIconReducer from './scrolledHeroIconReducer';
import deviceTypeReducer from './deviceTypeReducer';
import heroTextAnimationReducer from './heroTextAnimationReducer';
import backgroundPosReducer from './backgroundPosReducer';
import charLoaderReducer from './charLoaderReducer';
import currentCharsReducer from './currentCharsReducer';
import siteAnimatingReducer from './siteAnimatingReducer';
import currentFooterCharsReducer from './currentFooterCharsReducer';
import browserReducer from './browserReducer';
import contentReducer from './contentReducer';
import updateUrlReducer from './updateUrlReducer';
import asyncVideoComponentReducer from './asyncVideoComponentReducer';
// combine all existing reducers
export default combineReducers({
	userAgent: userAgentReducer,
	scrolledItem: scrolledItemReducer,
	activeItem: activeItemReducer,
	clickedItems: clickedItemsReducer,
	activeHeroIcon: activeHeroIconReducer,
	scrolledHeroIcon: scrolledHeroIconReducer,
	deviceType: deviceTypeReducer,
	heroTextAnimation: heroTextAnimationReducer,
	backgroundPos: backgroundPosReducer,
	charLoader: charLoaderReducer,
	currentChars: currentCharsReducer,
	siteAnimating: siteAnimatingReducer,
	currentFooterChars: currentFooterCharsReducer,
	browser: browserReducer,
	content: contentReducer,
	updateUrl: updateUrlReducer,
	asyncVideoComponent: asyncVideoComponentReducer
});
