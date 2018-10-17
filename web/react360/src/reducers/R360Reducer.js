import { FETCH_R360 } from './../actions';

const INITIAL_STATE = {
  render: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_R360:
      return action.payload;
    default:
      return state;
  }
};
