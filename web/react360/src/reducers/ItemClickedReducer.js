import { FETCH_ITEM_CLICKED } from './../actions';


export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ITEM_CLICKED:
      return action.payload;
    default:
      return state;
  }
};
