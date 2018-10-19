import _merge from 'lodash/merge';

// import { lstoreGet } from '../store/local-storage';
import hashTo from '../native/hash-to';
import request from './request';


/**
 * [Post 类型接口, 默认发送数据类型为 body(application/json) 类型]
 * @method fetchGet
 * @param  {String} [pathname='/']                  [请求的 pathname]
 * @param  {Object} data                            [请求的数据, 默认采用 application/json 的方式放在 body 中]
 * @param  {Object} [options={}]                    [其他可配置的参数(参见 whatwg-fetch), 如: headers]
 * @param  {String} [host='http://127.0.0.1:7000']  [请求的主机(可含端口号)]
 * @return {Promise}                                 [description]
 */
export default function fetchGet(pathname = '/', data, options = {}, host = 'http://127.0.0.1:7000') {
  // const user = lstoreGet('user') || {};
  let search = hashTo(data);
  search = search ? `?${search}` : '';

  return request(`${host}${pathname}${search}`, _merge({
    method: 'GET',
    headers: {
      // 'User-Token': user.token || '',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  }, options));
}
