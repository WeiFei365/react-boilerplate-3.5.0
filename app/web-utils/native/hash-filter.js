import _isString from 'lodash/isString';

import hashTo from './hash-to';
import hashFrom from './hash-from';


/**
 * [过滤 URL 的 search 或 hash 中的参数, 注意，返回值中不包含前缀 '?' 或 '#']
 * @author WEIFEI
 * @method hashFilter
 * @param  {Object|String}  any           [可以直接传 search 或 hash 字符串, 或 json]
 * @param  {Array}          [excepts=[]]  [要去除的参数名称]
 * @return {String}                       [不带 '?' 或 '#' 前缀的字符串]
 */
export default function hashFilter(any, excepts = []) {
  if (!excepts || !excepts.length) {
    if (_isString(any)) {
      // 这里之所以要来回转再返回, 是为了去除前缀的 '?' 或 '#', 统一返回值
      return hashTo(hashFrom(any));
    }
    return hashTo(any);
  }

  const data = (_isString(any) ? hashFrom(any) : any) || '';
  // 去除要排除参数
  Object.keys(data).forEach((key) => {
    if (excepts.indexOf(key) !== -1) {
      delete data[key];
    }
  });

  return hashTo(data);
}
