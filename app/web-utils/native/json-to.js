/**
 * [安全的将字符串转成 json]
 * @author WEIFEI
 * @method jsonTo
 * @param  {String} jsonstr [description]
 * @param  {[type]} dft     [转换失败或非法 jsonstr 时的返回值]
 * @return {[type]}         [description]
 */
export default function jsonTo(jsonstr, dft) {
  if (!jsonstr) {
    return dft;
  }

  try {
    return JSON.parse(jsonstr);
  } catch (err) {
    // console.error(err);
  }

  return dft;
}
