/* eslint "import/prefer-default-export": 1 */

import { SET_AUTH_FLAG } from './actionTypes';

export const setAuthFlag = function setAuthFlag(flag) {
  return {
    type: SET_AUTH_FLAG,
    flag,
  };
};
