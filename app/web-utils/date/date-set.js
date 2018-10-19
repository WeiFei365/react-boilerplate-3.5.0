import dateConstructor from './date-constructor';


/**
 * 日期重置工具,
 * 即: 重置日期到某个起点, 如: 零点、零分、当月第一天,
 * 比如: 原日期是 2018-09-29 13:14:15 60,
 * 重置到 零点后是 2018-09-29 13:00:00 0, 即endPoint='h'
 * 重置到 零分后是 2018-09-29 13:00:00 0, 即endPoint='m'
 * @author WEIFEI
 * @method dateSet
 * @param  {Date|Number|String} any [参见: dateConstructor 的 any 参数]
 * @param  {String} endPoint        [重置的结束点, 当前支持的值有(假设原时间为 2018-09-29 13:14:15 60):
 *                                  M: 返回 2018-01-01 00:00:00 0
 *                                  d: 返回 2018-09-01 00:00:00 0
 *                                  h: 返回 2018-09-29 00:00:00 0
 *                                  m: 返回 2018-09-29 13:00:00 0
 *                                  s: 返回 2018-09-29 13:14:00 0
 *                                  ms: 返回 2018-09-29 13:14:15 0]
 * @param  {String} timezone        [时区, 默认是本地时区, 当前支持的值有: UTC]
 * @return {Date}                   [description]
 */
export default function dateSet(any, endPoint, timezone = '') {
  /* eslint-disable no-fallthrough */
  const date = dateConstructor(any, true);

  switch (endPoint) {
    case 'M':
      date[`set${timezone}Month`](1);
    case 'd':
      date[`set${timezone}Date`](1);
    case 'h':
      date[`set${timezone}Hours`](0);
    case 'm':
      date[`set${timezone}Minutes`](0);
    case 's':
      date[`set${timezone}Seconds`](0);
    case 'ms':
      date[`set${timezone}Milliseconds`](0);
      break;
    default:
  }
  return date;
}
