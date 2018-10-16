import { Actions } from 'react-native-router-flux';

import {
  TEST_FETCH
} from './types';

export const test = () => {
  return () => {
    console.log("test");
  };
};
