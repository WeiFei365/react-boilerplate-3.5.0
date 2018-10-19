import _isArray from 'lodash/isArray';
import {
  regexSPS,
} from './const';


/**
 * [编译用于按字符来匹配/高亮字符串的正则模板, 会过滤掉正则中的特殊字符]
 * @author WEIFEI
 * @method regexSearchChar
 * @param  {Array}         [chars=[]] [待编译的字符数组]
 * @param  {String}        [opts='']  [实例化 RegExp 的第二个参数, 不建议用]
 * @return {Object}                   [编译包结构如下:]
 *                                    {
 *                                        @param RegExp test: 用于测试某字符串是否包含chars中的字符
 *                                        @param RegExp replace: string.replace 函数的第一个参数
 *                                        @param Function replacement: string.replace 函数的第二个参数
 *                                    }
 */
export default function regexSearchChar(chars = [], opts = '') {
  if (!_isArray(chars)) {
    return {};
  }
  /* eslint-disable no-param-reassign */
  chars = chars.map((d) => String(d))
    .filter((d) => !!d && regexSPS().indexOf(d) === -1)
    // 正则表达式最多支持到 $99
    .slice(0, 98);
  /* eslint-enable */
  if (!chars.length) {
    return {};
  }

  const pattern = `(.*?)${chars.join('(.*?)')}(.*?)`;

  return {
    // 用于检测字符串是否符合需要
    test: new RegExp(pattern, opts || 'i'),
    // 用于匹配出字符串中所有符合需要的子字符串
    replace: new RegExp(pattern, opts || 'ig'),
    // 用于替换所有匹配到的子串
    replacement: (...args) => {
      // TODO 这里可能有个缺陷, 比如: abac 在替换 ac 时, 所有的 a 都会被替换掉, 但是 babcba 在替换 ba 时, 第 2 个 b 会被忽略掉
      const items = args.slice(1, chars.length + 2);
      const strs = [items[0]];
      for (let i = 1; i < items.length; i += 1) {
        const c = chars[i - 1];
        strs.push(`<em>${c}</em>`);
        strs.push(items[i].replace(new RegExp(c, 'ig'), `<em>${c}</em>`));
      }
      return strs.join('');
    },
  };
}
