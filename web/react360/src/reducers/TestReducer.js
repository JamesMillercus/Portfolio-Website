import {
  TEST_FETCH
} from './../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEST_FETCH:
      return action.payload;
    default:
      return state;
  }
};
