/**
 * [操作 history/location 工具包]
 * @author  WEIFEI
 * @description history is a JavaScript library that lets you easily manage session history anywhere JavaScript runs.
 *              history abstracts away the differences in various environments and provides a minimal API
 *              that lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.
 * @exports history  [history/createBrowserHistory 的实例]
 * @exports lctPush  [在 history 中新增一条 location, 并切换到该路由]
 *          @param {Object|String}  params  [新路由,
 *                                           可以是字符串: /home?user=test#name=abc,
 *                                           也可以是 json: { pathname: '/home', search: '?user=test', hash: '#name=abc' }]
 * @exports lctReplace [替换 history 中当前的 location, 并切换到该路由]
 *          @param {Object|String}  params  [新路由,
 *                                           可以是字符串: /home?user=test#name=abc,
 *                                           也可以是 json: { pathname: '/home', search: '?user=test', hash: '#name=abc' }]
 * @exports lctGet  [获取 store 中的数据]
 *          @param {String} path  [路径, 支持: 'searchJson.user' 层级路径, 目前可取的数据有:
 *                                action: 当前路由的触发方式,
 *                                pathname: 当前 location 的 pathname,
 *                                searchString: 当前 location 的 search 字符串, 注意: 这里的参数未 decode, 下同,
 *                                searchJson: 当前 location 的 search 的 json 格式,
 *                                hashString: 当前 location 的 hash 字符串,
 *                                hashJson: 当前 location 的 hash 的 json 格式,
 *                                stateString: 当前 location 的 state 字符串,
 *                                stateJson: 当前 location 的 state 的 json 格式]
 *          @returns {Object|String}
 * @exports lctQuery [过滤并返回当前 location 中的 search 和 hash]
 *          @param {Array(String)}  excepts [要去除的键名称, 如: ['user']]
 *          @returns {String}
 * @requires lodash/get
 * @requires lodash/assign
 * @requires history/createBrowserHistory
 * @see https://github.com/ReactTraining/history
 */

import _get from 'lodash/get';
import _assign from 'lodash/assign';
import createHistory from 'history/createBrowserHistory';

import hashFilter from '../native/hash-filter';
import hashFrom from '../native/hash-from';


// 存储池
const store = {};
// 实例化 history API
const history = createHistory();
// 监听 location 变化, 实时解析最新的 location
history.listen(lctParser);
// 初始化 location 数据
lctParser(history.location, history.action);
/**
 * location 解析器
 * @method lctParser
 * @param  {Object}  lct    [类似 window.location]
 * @param  {Object}  action [description]
 * @return {[type]}         [description]
 */
function lctParser(lct, action) {
  const hashJson = hashFrom(lct.hash, true);
  const stateJson = hashFrom(lct.state, true);
  const searchJson = hashFrom(lct.search, true);

  return _assign(store, {
    action,
    pathname: lct.pathname,
    hashJson,
    hashString: lct.hash,
    stateJson,
    stateString: lct.state,
    searchJson,
    searchString: lct.search,
  });
}

export default history;

export function lctPush(params) {
  history.push(params);
}

export function lctReplace(params) {
  history.replace(params);
}

export function lctGet(path) {
  return _get(store, path);
}

export function lctQuery(excepts) {
  const search = hashFilter(store.searchJson, excepts);
  const hash = hashFilter(store.hashJson, excepts);
  return [
    search ? `?${search}` : '',
    hash ? `#${hash}` : '',
  ].join('');
}

/**
 * 方便开发调试, export 是为了和 store 在同一个作用域内
 * @method MVP_Store_History
 */
/* eslint-disable camelcase */
window.MVP_Store_History = () => JSON.parse(JSON.stringify(store));
export const MVP_Store_History = window.MVP_Store_History;
/* eslint-enable */
