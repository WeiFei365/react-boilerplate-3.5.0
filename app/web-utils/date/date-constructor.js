/**
 * 以各种形式构造 Date 实例
 * @method dateConstructor
 * @param  {Date|Number|String} any             [支持的类型:
 *                                              时间毫秒值,
 *                                              Date 实例,
 *                                              Date 字符串, 需要能被原生 Date 解析]
 * @param  {Boolean}            [isSelf=false]  [如果 any 为 Date 实例类型, 是否直接返回, 还是返回新构造的 Date 实例]
 * @return {Date}                               [description]
 */
export default function dateConstructor(any, isSelf = false) {
  if (any instanceof Date) {
    // TODO 这里使用 any.getTime 来获取构造新 Date 实例的方式可能因为运行时的环境或时区问题,
    // 导致返回的新 Date 实例和 any 表示的时间不同
    return isSelf ? any : new Date(any.getTime());
  } else if (typeof any === 'number') {
    return new Date(any);
  }
  const s = String(any || 0);
  return s.replace(/\d+/g, '').length ? new Date(s) : new Date(+s || 0);
}
