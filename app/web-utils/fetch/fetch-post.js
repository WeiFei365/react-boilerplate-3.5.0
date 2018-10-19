import _merge from 'lodash/merge';

// import { lstoreGet } from '../store/local-storage';
import jsonFrom from '../native/json-from';
import request from './request';


/**
 * [Get 类型接口, 默认发送数据类型为 hash(search) 类型]
 * @method fetchPost
 * @param  {String}  [pathname='/']                 [请求的 pathname]
 * @param  {Object}  data                           [请求的数据, 默认采用 hash(search) 的方式拼接在 pathname 中]
 * @param  {Object}  [options={}]                   [其他可配置的参数(参见 whatwg-fetch), 如: headers]
 * @param  {String}  [host='http://127.0.0.1:7000'] [请求的主机(可含端口号)]
 * @return {Promise}                                [description]
 */
export default function fetchPost(pathname = '/', data, options = {}, host = 'http://127.0.0.1:7000') {
  // const user = lstoreGet('user') || {};
  const body = jsonFrom(data) || '';

  return request(`${host}${pathname}`, _merge({
    method: 'POST',
    headers: {
      // 'User-Token': user.token || '',
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body,
  }, options));
}
