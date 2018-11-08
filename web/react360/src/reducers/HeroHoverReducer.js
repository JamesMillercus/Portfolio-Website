import { FETCH_HERO_HOVER } from './../actions';

export default (state = '', action) => {
  switch (action.type) {
    case FETCH_HERO_HOVER:
      return action.payload;
    default:
      return state;
  }
};
