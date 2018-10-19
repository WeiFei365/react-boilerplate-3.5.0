import dateConstructor from './date-constructor';
import dateSet from './date-set';


// 一小时的毫秒值
export const timeHour = 1000 * 60 * 60;
// 一天的毫秒值
export const timeDay = 1000 * 60 * 60 * 24;
// 一周的毫秒值
export const timeWeek = 1000 * 60 * 60 * 24 * 7;

/**
 * 计算两个时间毫秒值之间相差的天数
 * @author WEIFEI
 * @method dateDays
 * @param  {Number|Date|String} start [参见: dateConstructor 的 any 参数]
 * @param  {Number|Date|String} end   [参见: dateConstructor 的 any 参数]
 * @return {Number}                   [相差天数]
 */
export default function dateDays(start, end) {
  const [min, max] = [dateConstructor(start), dateConstructor(end)].sort((a, b) => a.getTime() - b.getTime());

  dateSet(min, 'h');
  dateSet(max, 'h');

  return (max.getTime() - min.getTime()) / timeDay;
}
