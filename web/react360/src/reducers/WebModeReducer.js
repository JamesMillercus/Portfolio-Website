import { FETCH_WEB_MODE } from './../actions';

export default (state = 'webvr', action) => {
  switch (action.type) {
    case FETCH_WEB_MODE:
      return action.payload;
    default:
      return state;
  }
};
