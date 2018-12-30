import { FETCH_LOADING_PROGRESS } from './../actions';

export default (state = 5, action) => {
  switch (action.type) {
    case FETCH_LOADING_PROGRESS:
      return action.payload;
    default:
      return state;
  }
};
