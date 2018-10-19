/**
 * [基于 local-storage 模块的高级存储结构, 适合于存储高级的数据结构, 并有一定的高级操作方式;
 * 本模块也可以基于其他类似 local-storage 的存储块;
 * 本模块主要用于存储 Array 类型的数据结构, 并且可以基于该数据做增、删、检索的操作;
 * 存储列表采用先进后出的时间策略, 类似于用户的输入历史会优先展示最近输入的]
 * @author WEIFEI
 * @example [使用方式请参考: lstore-db-user_list 和 lstore-db-search_words 两个模块, 然后根据需求定制]
 * @description 所有数据采用 add 时的时间毫秒值排序, 先进后出的模式;
 * @description 目前仅存储最多 10 条数据, add 数据时如果超限会截取最近的 10 条存储
 * @description 操作函数 [
 *              主要用于内部操作灵活需要, 需要在 class 实例化时传入
 *              @inner  key [用于到 local-storage 中存取原始数据的 交互KEY]
 *              @inner  check [当 add 数据时, 用以校验新数据是否正确, 不正确的话不会执行 add 操作]
 *                     @param {[type]}  data  [新的数据]
 *                     @return                [注意, 如果 data 为引用数据类型, 在该校验器中修改 data 数据, 也会被保存,
 *                                            比如, 该函数也可以作为数据的修正函数, 以保存正确的数据结构]
 *              @inner  isEqual  [当 add/delete 数据时, 用以校验数据是否与已有数据相等, 以此执行不同的操作]
 *                     @param {[type]}  oldd  [已有的数据]
 *                     @param {[type]}  newd  [新数据]
 *                     @return {Boolean}     []
 *              @inner  searchBy  [当 select 操作时, 并且需要过滤(search 参数)数据时, 获取待匹配的数据]
 *                     @param   {[type]}        data  [元数据]
 *                     @return  {Array[String]}       [待匹配的数据组成的数组, 如果任意被匹配到了, 则返回同等长度的已替换了的字符串]
 *              ]
 * @exports constructor [class 的使用需要先实例化]
 * @exports select      []
 *          @param  {Number}  [limit=6] [本次取出的数据条数]
 *          @param  {String}  search    [需要检索的字符串, 会调用 regex/search-char 模块进行模糊匹配, 并添加 em 标签到找到的所有字符]
 *          @param  {Boolean} desc      [按时间正序/倒序返回]
 *          @return {Array}             []
 * @exports add         [新增数据到存储中, 会调用 check 进行校验、并且调用 isEqual 进行去重, 数据保存采用先进后出的策略]
 *          @param  {[type]}  data      [需要新增的数据, 注意，这里会调用 check 检查数据, 因此还可以在 check 中进行数据的修正等操作]
 * @exports delete      [删除指定的数据, 会调用 isEqual 来进行数据的比对]
 *          @param  {[type]}  data      [需要删除的数据, 因为是调用的 isEqual 进行判等,
 *                                      所以最终删除哪些(采用 filter 的方式删除)由调用层决定]
 */

import regexSearchChar from '../regex/search-char';
import {
  lstoreGet,
  lstoreSet,
} from './local-storage';

export default class LStoreDB {
  constructor(props = {}) {
    /* eslint-disable no-param-reassign,no-underscore-dangle */
    const self = this;
    // props.key = props.key || '';
    // for item(row)
    props.check = props.check || self._check;
    props.isEqual = props.isEqual || self._isEqual;
    props.searchBy = props.searchBy || self._searchBy;

    self.props = props;
    /* eslint-enable */
  }

  _check = (data) => !!data;
  _isEqual = (oldd, newd) => oldd === newd;
  _searchBy = (data) => [String(data || '')];

  select = (limit = 6, search = '', desc = true) => {
    const { props } = this;

    let rowList = lstoreGet(props.key).sort((a, b) => b.time - a.time);
    if (!desc) {
      rowList = rowList.reverse();
    }

    if (search) {
      const regex = regexSearchChar(search.split('').filter((d) => !!d.trim()));
      if (regex.replacement) {
        rowList = rowList.map((d) => {
          let isAny = false;
          const row = { html: [], data: d.data };
          props.searchBy(d.data).forEach((str) => {
            const isTest = regex.test.test(str);
            row.html.push(isTest ? str.replace(regex.replace, regex.replacement) : str);
            if (isTest) {
              isAny = true;
            }
          });
          return isAny ? row : false;
        }).filter((d) => !!d);
      }
    }
    // 去除内部使用的 time 等字段
    rowList = rowList.map((d) => d.time ? ({ data: d.data }) : d);

    return rowList.slice(0, limit);
  }

  add = (data) => {
    const { props } = this;

    if (!props.check(data)) {
      return;
    }

    const rowList = lstoreGet(props.key).filter((d) => !props.isEqual(d.data, data));
    rowList.unshift({ data, time: Date.now() });
    lstoreSet(props.key, rowList.slice(0, 10));
  }

  delete = (data) => {
    const { props } = this;

    lstoreSet(props.key, lstoreGet(props.key).filter((d) => !props.isEqual(d.data, data)));
  }
}
