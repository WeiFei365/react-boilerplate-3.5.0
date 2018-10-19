import _trim from 'lodash/trim';

import jsonTo from './json-to';


/**
 * [解码 url 中的 search 或 hash 成 json 对象]
 * @author WEIFEI
 * @method hashFrom
 * @param  {String}  [str='']               [待解析的 search 或 hash 字符串]
 * @param  {Boolean} [isValueJson=false]    [是否尝试将 KEY-VALUE 对中的 VALUE 尝试 JSON.parse 解析,
 *                                          小提示: 如果为 true 能够识别出 number boolean 等类型]
 * @param  {Boolean} [isLowerCaseKey=false] [是否将 KEY-VALUE 中的 KEY 转小写]
 * @return {Object}                         [description]
 */
export default function hashFrom(str = '', isValueJson = false, isLowerCaseKey = false) {
  const data = {};

  // TODO 这里忽略了一个问题，例如: https://www.baidu.com/?a=1?b=2#c=1?d=2#e=4
  // 先replace所有的'?'和'#'为'&'，之所以replace成'&'是为了拼接出现多个'?'或'#'片段
  _trim(str).replace(/(\?|#)/ig, '&')
    .split('&')
    // 按=切分KEY-VALUE对
    .map((d) => d.split('=').map((c) => c.replace(/\s+/ig, '')).filter((c) => !!c.length))
    .filter((d) => {
      if (d.length === 2) {
        return true;
      } else if (d.length === 1) {
        // 填充无VALUE的参数
        d.push('');
        return true;
      }
      return false;
    })
    .forEach((d) => {
      const k = isLowerCaseKey ? d[0].toLowerCase() : d[0];
      const v = decodeURIComponent(d[1]);
      data[k] = (isValueJson ? jsonTo(v) : v) || v;
    });

  return data;
}
