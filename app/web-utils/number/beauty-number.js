import _isNaN from 'lodash/isNaN';


/**
 * 格式化数值, 增加千位符, 不会增加小数部分的千位符
 * @author WEIFEI
 * @method beautyNumber
 * @param  {Number}   n       [description]
 * @param  {Boolean}  noZero  [如果结果是'0'时返回'']
 * @return {String}           [description]
 */
export default function beautyNumber(n, noZero) {
  let number = +n;
  if (_isNaN(number) || number === 0) {
    return noZero ? '' : '0';
  }
  number = String(number);
  if (number.split('.').filter((d) => d.length > 3).length === 0) {
    return number;
  }
  number = number.split('.');
  number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return number.join('.');
}
