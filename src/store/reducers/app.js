import initialState from '../states/app';
import { SET_AUTH_FLAG } from '../actions/app/types';

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
