import { FETCH_HERO } from './../actions';

const INITIAL_STATE = {
  hover: '',
  heroText: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HERO:
      return action.payload;
    default:
      return state;
  }
};
