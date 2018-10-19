/*
 * 示例:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import {
  CHANGE_ANY,
} from './constants';


// The initial state of the App
const initialState = {
  repos: [],
  username: '',
  apiError: false,
  apiLoading: false,
};

export default function githubReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ANY:
      {
        Object.assign(state, action.payload);
        return Object.assign({}, state);
      }
    default:
      return state;
  }
}
