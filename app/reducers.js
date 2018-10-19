/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    // example
    example: (state = {}, action) => {
      switch (action.type) {
        default:
          // 返回原始 state，不会触发更新
          return state;
      }
    },
    ...injectedReducers,
  });
}
