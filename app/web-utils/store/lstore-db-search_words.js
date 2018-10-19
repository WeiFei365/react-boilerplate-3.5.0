/**
 * [模拟 Array(String) 存储类型, 以及对其的操作案例,
 * 使用方式请参考测试用例: test/store/lstore-db-seach_words.test;
 * 这里有点类似于前端保存用户的输入历史, 已被用户输入时给予提示]
 * @author WEIFEI
 */

import { lstoreKeys } from './local-storage';
import LStoreDB from './lstore-db';


// 初始化 localStorage 交互 KEY 和校验器
lstoreKeys({
  'search-words': (v, s, dft) => dft.array(v, s, dft).filter((d) => {
    if (d instanceof Object) {
      /* eslint-disable no-param-reassign */
      // 这里给一个初始毫秒值: 1, 而不是 0 是为了之后的 select 方便
      d.time = +d.time || 1;
      d.data = dft.stringTrim(d.data, s, dft);
      /* eslint-enable */
      return !!d.data;
    }
    return false;
  }),
});
// 实例化
const searchWords = new LStoreDB({
  key: 'search-words',
  check: (data) => !!String(data || '').trim(),
});

export default searchWords;
