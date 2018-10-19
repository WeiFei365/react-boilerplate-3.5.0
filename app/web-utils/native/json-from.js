import _isNaN from 'lodash/isNaN';


/**
 * [安全的调用JSON.stringify]
 * @author WEIFEI
 * @method jsonFrom
 * @param  {[type]} jsondata [description]
 * @param  {String} [dft=''] [在非法的 jsondata 或转换出错时的返回值]
 * @return {[type]}          [description]
 */
export default function jsonFrom(jsondata, dft = '') {
  if (jsondata === null || jsondata === undefined || _isNaN(jsondata)) {
    return dft;
  }

  try {
    return JSON.stringify(jsondata);
  } catch (err) {
    // console.error(err);
  }

  return dft;
}
