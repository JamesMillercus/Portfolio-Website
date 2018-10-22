import { combineReducers } from 'redux';
import ItemScrolledReducer from './ItemScrolledReducer';
import HeroTextReducer from './HeroTextReducer';
import HeroHoverReducer from './HeroHoverReducer';
import ItemClickedReducer from './ItemClickedReducer';
import ActiveItemReducer from './ActiveItemReducer';

export default combineReducers({
  itemScrolled: ItemScrolledReducer,
  heroText: HeroTextReducer,
  heroHover: HeroHoverReducer,
  itemClicked: ItemClickedReducer,
  activeItem: ActiveItemReducer
});
