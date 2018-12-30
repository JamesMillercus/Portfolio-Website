import { FETCH_LOADING_CONTENT } from './../actions';

export default (state = '', action) => {
  switch (action.type) {
    case FETCH_LOADING_CONTENT:
      return action.payload;
    default:
      return state;
  }
};
