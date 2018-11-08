import { FETCH_SCROLLED_ITEM } from './../actions';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_SCROLLED_ITEM:
      return action.payload;
    default:
      return state;
  }
};
