import { FETCH_WEB_BROWSER } from './../actions';

export default (state = '', action) => {
  switch (action.type) {
    case FETCH_WEB_BROWSER:
      return action.payload;
    default:
      return state;
  }
};
