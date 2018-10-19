import 'whatwg-fetch';


// http 请求网络级的报错，如: 404、503、断网等
const HTTP_ERROR = Math.random();

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return null;
  }

  const error = new Error(response.statusText);
  error.response = response;
  return error;
}

/**
 * [实际的使用中, 请使用 fetchGet 或 fetchPost
 *  下面的 TODO 都是需要在实际项目中根据需要选择/更改使用
 * ]
 * @method request
 * @param  {String} url     [包含: 主机, pathname, search, hash 等信息的 URL]
 * @param  {Object} options [其他可配置的参数(参见 whatwg-fetch), 如: headers]
 * @return {Promise}         [description]
 */
export default function request(url, options) {
  return fetch(url, options)
    .then((response) => { // 拦截所有请求状态
      const error = checkStatus(response);
      if (error) {
        return {
          error,
          // 服务器出错, 比如: 500
          code: HTTP_ERROR,
        };
      }
      // TODO 这里只处理返回的 json 格式数据,
      // 还可以处理流: response.blob(),
      // 或者文本: response.text()
      return response.json();
    }, (error) => ({
      error,
      // 通信异常, 比如: 网络中断、跨域等
      code: HTTP_ERROR,
    })).catch((error) => ({ // 捕获其他所有报错, 保证之后的 then 可以只处理 resolve, 以 code 来判断请求结果
      error,
      // 未知异常
      code: HTTP_ERROR,
    }))
    .then((data) => { // 统一处理接口状态, 返回调用层"需要的数据"
      if (data.code === HTTP_ERROR) {
        // throw http 级的状态错误
        return Promise.reject(data.error);
      }
      if (data.code === 0) {
        // TODO 1、检查请求成功的标志
        // 和接口方约定, data.data 为请求返回的数据
        return data.data;
      }
      if (data.error) {
        // TODO 2、前端错误处理
        return data;
      }
      if (data.code === 10404) {
        // TODO 3、检查是否为用户未登录状态
        // 判断是否为 check-token 的请求,
        // 如果是, 则应交由调用层处理
        if (url.indexOf('/check-token') !== -1) {
          return data;
        }
        // 如果否, 则应刷新页面(或提示用户登录)
        window.location.reload();
        return { code: '未登录' };
      }
      // TODO 4、检查当前版本是否为最新版
      // TODO 5、检查其他状态码
      // TODO 6、未知异常
      return data;
    });
}
