import { combineReducers } from 'redux';
import ItemScrolledReducer from './ItemScrolledReducer';
import HeroTextReducer from './HeroTextReducer';
import HeroHoverReducer from './HeroHoverReducer';
import ItemClickedReducer from './ItemClickedReducer';
import ActiveItemReducer from './ActiveItemReducer';
import DeviceTypeReducer from './DeviceTypeReducer';

export default combineReducers({
  scrolledItem: ItemScrolledReducer,
  heroText: HeroTextReducer,
  heroHover: HeroHoverReducer,
  clickedItems: ItemClickedReducer,
  activeItem: ActiveItemReducer,
  deviceType: DeviceTypeReducer
});
