/**
 * 分隔显示大数值, 如: '1234 5678 90'
 * @author WEIFEI
 * @method beautyLong
 * @param  {Number|String}  n             [description]
 * @param  {Boolean}        [byLeft=true] [例如:
 *                                        true: 1234 5678 90,
 *                                        false: 12 3456 7890]
 * @param  {String}         [flag=' ']    [要替换成的分隔符, 默认是: ' ']
 * @param  {Boolean}        [noZero=true] [当 n 非法时, 返回 '0' 或 '']
 * @return {String}                       [description]
 */
export default function beautyLong(n, byLeft = true, flag = ' ', noZero = true) {
  let number = String(n).replace(/\D+/g, '');
  if (!number) {
    return noZero ? '' : '0';
  }
  if (number.length < 5) {
    return number;
  }
  // 反转
  if (byLeft) {
    number = number.split('').reverse().join('');
  }
  // 添加 flag
  number = number.replace(/\B(?=(\d{4})+(?!\d))/g, flag);
  return byLeft ? number.split('').reverse().join('') : number;
}
