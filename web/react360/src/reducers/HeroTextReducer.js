import { FETCH_HERO_TEXT } from './../actions';

export default (state = 'scrolled', action) => {
  switch (action.type) {
    case FETCH_HERO_TEXT:
      return action.payload;
    default:
      return state;
  }
};
