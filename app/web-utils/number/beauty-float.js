import beautyNumber from './beauty-number';


/**
 * 格式化数值, 整数部分增加千位符, 小数部分截取需要的长度
 * @author WEIFEI
 * @method beautyFloat
 * @param  {Number}     n         [description]
 * @param  {Number}     [count=2] [小数容许的最大个数]
 * @param  {Boolean}    noZero    [参见: beautyNumber]
 * @return {String}               [description]
 */
export default function beautyFloat(n, count = 2, noZero) {
  const [inte, deci] = beautyNumber(n, noZero).split('.');
  if (!deci) {
    return inte;
  }
  return `${inte}.${deci.substr(0, count)}`;
}
