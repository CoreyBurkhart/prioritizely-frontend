import initialState from '../initialState';
import { SET_AUTH_FLAG } from '../actions/actionTypes';

function app(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_FLAG:
      return Object.assign({}, state, {
        authenticated: action.flag,
      });
    default:
      return state;
  }
}

export default app;
