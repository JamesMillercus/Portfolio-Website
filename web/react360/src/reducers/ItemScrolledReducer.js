import { FETCH_ITEM_SCROLLED } from './../actions';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEM_SCROLLED:
      return action.payload;
    default:
      return state;
  }
};
