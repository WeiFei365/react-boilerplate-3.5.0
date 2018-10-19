/*
 * 添加一个 Action 的步骤:
 * 1) 导入定义的 constant
 * 2) 新增一个 function 类似:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_ANY,
  FETCH_REPOS,
} from './constants';


/**
 * 批量更新 store 中的数据
 *
 * @method stateAny

 * @param  {Object} payload [新数据组成的对象]

 * @return {Object}         [An action object with a type of CHANGE_ANY]
 */
export function stateAny(payload) {
  return {
    type: CHANGE_ANY,
    payload,
  };
}

export function fetchRepos() {
  return {
    type: FETCH_REPOS,
  };
}
