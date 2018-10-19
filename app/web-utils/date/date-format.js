import dateConstructor from './date-constructor';


/**
 * 时间格式化
 * @author WEIFEI
 * @method dateFormat
 * @param  {Date|Number|String}   any         [参见: dateConstructor 的 any 参数]
 * @param  {String}   [pattern='YYYY-MM-DD']  [模板, 完整模板为:
 *                                            YYYY-MM-DD HH:mm:ss S EE,
 *                                            其中,
 *                                            HH 表示24小时制, hh 表示12小时制,
 *                                            EE 的输出如: 周四,
 *                                            EEE 的输出如: 星期四,
 *                                            - 可以改为任意值, 如: YYYY年MM月DD日HH时mm分ss秒 S毫秒 EE]
 * @return {String}                           [description]
 */
export default function dateFormat(any, pattern = 'YYYY-MM-DD') {
  /* eslint-disable no-param-reassign */
  const date = dateConstructor(any);

  const dict = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  // 日, 一, 二, 三, 四, 五, 六
  const weekDay = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'];

  // 替换模板中的年
  if (/(Y+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
  }
  // 替换一周中的某天
  if (/(E+)/.test(pattern)) {
    let pre = '';
    if (RegExp.$1.length === 2) {
      // 前缀为: 周
      pre = '\u5468';
    } else if (RegExp.$1.length > 2) {
      // 前缀为: 星期
      pre = '\u661f\u671f';
    }
    pattern = pattern.replace(RegExp.$1, `${pre}${weekDay[date.getDay()]}`);
  }
  // 替换其他的标志
  Object.keys(dict).forEach((d) => {
    if (!new RegExp(`(${d})`).test(pattern)) {
      return;
    }
    pattern = pattern.replace(RegExp.$1, RegExp.$1.length === 1 ? dict[d] : `00${dict[d]}`.substr(String(dict[d]).length));
  });

  return pattern;
}
