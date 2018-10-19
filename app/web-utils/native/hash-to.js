import _isNaN from 'lodash/isNaN';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';

import jsonFrom from './json-from';


/**
 * [编码json为URL中需要的search或hash]
 * @author WEIFEI
 * @method hashTo
 * @param  {Json} data    [description]
 * @return {String}       [description]
 */
export default function hashTo(data) {
  if (!data || !_isObject(data)) {
    return '';
  }
  return Object.keys(data).map((hsk) => {
    let hsv = data[hsk];
    if (hsv === null || hsv === undefined || _isNaN(hsv)) {
      return hsk;
    } else if (_isArray(hsv) || _isObject(hsv)) {
      hsv = jsonFrom(hsv);
    } else {
      hsv = String(hsv);
    }
    return `${hsk}=${encodeURIComponent(hsv)}`;
  }).filter((d) => !!d).join('&');
}
