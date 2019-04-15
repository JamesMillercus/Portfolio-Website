import { combineReducers } from 'redux';
import ItemScrolledReducer from './ItemScrolledReducer';
import HeroTextReducer from './HeroTextReducer';
import HeroHoverReducer from './HeroHoverReducer';
import ItemClickedReducer from './ItemClickedReducer';
import ActiveItemReducer from './ActiveItemReducer';
import DeviceTypeReducer from './DeviceTypeReducer';
import LoadingContentReducer from './LoadingContentReducer';
import LoadingProgressReducer from './LoadingProgressReducer';
import WebModeReducer from './WebModeReducer';
import WebBrowserReducer from './WebBrowserReducer';

export default combineReducers({
  scrolledItem: ItemScrolledReducer,
  heroText: HeroTextReducer,
  heroHover: HeroHoverReducer,
  clickedItems: ItemClickedReducer,
  activeItem: ActiveItemReducer,
  deviceType: DeviceTypeReducer,
  loadingContent: LoadingContentReducer,
  loadingProgress: LoadingProgressReducer,
  webMode: WebModeReducer,
  webBrowser: WebBrowserReducer
});
