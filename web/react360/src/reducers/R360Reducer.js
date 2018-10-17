import { FETCH_R360 } from './../actions';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_R360:
      return action.payload;
    default:
      return state;
  }
};
