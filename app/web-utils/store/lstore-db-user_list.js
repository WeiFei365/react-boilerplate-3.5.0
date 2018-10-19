/**
 * [模拟 Array(Object) 存储类型, 以及对其的操作案例,
 * 使用方式请参考测试用例: test/store/lstore-db-user_list.test]
 * @author WEIFEI
 */

import { lstoreKeys } from './local-storage';
import LStoreDB from './lstore-db';


// 初始化 localStorage 交互 KEY 和校验器
lstoreKeys({
  'user-list': (v, s, dft) => dft.array(v, s, dft).filter((d) => {
    if (d instanceof Object && d.data instanceof Object && d.data.id && d.data.name) {
      /* eslint-disable no-param-reassign */
      // 这里给一个初始毫秒值: 1, 而不是 0 是为了之后的 select 方便
      d.time = +d.time || 1;
      d.data.id = String(d.data.id);
      d.data.name = String(d.data.name);
      /* eslint-enable */
      return true;
    }
    return false;
  }),
});
// 实例化
const userList = new LStoreDB({
  key: 'user-list',
  check: (data) => {
    /* eslint-disable no-param-reassign */
    // TODO 以下的判断条件需要根据真实的业务场景做更改
    if (!data || !(data instanceof Object)) {
      return false;
    }
    if ([null, undefined].indexOf(data.id) !== -1) {
      return false;
    }
    if ([null, undefined].indexOf(data.name) !== -1) {
      return false;
    }
    data.id = String(data.id);
    data.name = String(data.name);
    /* eslint-enable */
    return true;
  },
  isEqual: (oldd, newd) => newd && newd instanceof Object && oldd.id === String(newd.id) && oldd.name === String(newd.name),
  searchBy: (data) => [data.name, data.id],
});

export default userList;
