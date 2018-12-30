import { FETCH_CLICKED_ITEMS } from './../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CLICKED_ITEMS:
      return action.payload;
    default:
      return state;
  }
};
