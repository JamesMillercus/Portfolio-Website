import { combineReducers } from 'redux';
import R360Reducer from './R360Reducer';
import HeroReducer from './HeroReducer';

export default combineReducers({
  r360: R360Reducer,
  hero: HeroReducer
});
