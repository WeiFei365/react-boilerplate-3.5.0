import _isNaN from 'lodash/isNaN';


/**
 * 模糊大数值的显示, 如: 6000万、5000亿、4000万亿
 * @author WEIFEI
 * @method beautyUnit
 * @param  {Number}   n [待处理的数值]
 * @return {String}     [description]
 */
export default function beautyUnit(n) {
  let number = +n;
  if (_isNaN(number)) {
    return '0';
  }
  number = Math.abs(number);
  if (number < 10000) {
    return String(number);
  }

  number = Number(number).toFixed(0);

  let unit = ['', ''];
  if (number.length <= 8) {
    unit = [/\d{4}$/, '万'];
  } else if (number.length <= 12) {
    unit = [/\d{8}$/, '亿'];
  } else if (number.length <= 16) {
    unit = [/\d{12}$/, '万亿'];
  } else {
    return '不计其数';
  }

  number = number.replace(unit[0], '')
    .split('')
    .map((d, i) => i === 0 ? d : 0)
    .join('');
  return `${number}${unit[1]}`;
}
