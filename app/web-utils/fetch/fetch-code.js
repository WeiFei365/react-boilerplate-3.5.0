/**
 * 错误代码
 */

const codeMap = {
  // 请求错误代码
  10000: '服务器又开小差了，客官请稍等',
  20000: '唉吆喂，您的网络有点小问题',
  99999: '发现 UFO，情况未知',
  // 服务错误代码
  10404: '您还没有登录',
};

export default function fetchCode(code) {
  return codeMap[code] || codeMap[String(code)];
}
