import { combineReducers } from 'redux';
import R360Reducer from './R360Reducer';
import HeroTextReducer from './HeroTextReducer';
import HeroHoverReducer from './HeroHoverReducer';

export default combineReducers({
  r360: R360Reducer,
  heroText: HeroTextReducer,
  heroHover: HeroHoverReducer
});
