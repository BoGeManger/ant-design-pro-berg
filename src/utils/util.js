export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function formatCentInt2Float(row, column, cellValue) {
  const cent = cellValue || 0;
  var fmt = "¥ " + (cent / 100).toFixed(2);
  return fmt;
}

/**
 * 日期格式化
 *  @param {Date} val 
 *  @param {String} fmt 
 */
export function formatDate(val, fmt) {
  var o = {
    "M+": val.getMonth() + 1,                 //月份 
    "d+": val.getDate(),                    //日 
    "h+": val.getHours(),                   //小时 
    "m+": val.getMinutes(),                 //分 
    "s+": val.getSeconds(),                 //秒 
    "q+": Math.floor((val.getMonth() + 3) / 3), //季度 
    "S": val.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (val.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

/**
 * //替换所有字符
 * @param {String} val 
 * @param {*} s1 
 * @param {*} s2 
 */
export function replaceAll(val, s1, s2) {
  var r = new RegExp(s1.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
  return val.replace(r, s2);
}

/**
 * 是否为空
 * @param {*} val 
 */
export function isNullOrEmpty(val) {
  if (typeof val == 'undefined')
    return true;
  if (val === null || val === '')
    return true;
  if (toStr(val).length == 0)
    return true;
  return false;
}

/**
 * 生成guid
 */
export function newGuid() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * 格式化金额
 * @param {*} s 
 * @param {Number} n 
 */
export function formatMoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1], t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

/**
 * 格式化整数
 * @param {*} s 
 */
export function formatInt(s) {
  var n = 0;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1], t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("");
}

/**
 * xml转义编码
 * @param {String} str 
 */
export function htmlEncode(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * xml转义解码
 * @param {String} str 
 */
export function htmlDecode(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/**
 * 检查文本中是否有html元素，简单判断
 * @param {String} str 
 */
export function isHTML(str) {
  return /^<.*?>$/.test(str) && !!$(str)[0];
}

/**
 * 获取html里面的innerText
 * @param {String} htmlText 
 */
export function getInnerText(htmlText) {
  if (isNullOrEmpty(htmlText))
    return '';
  return htmlText.replace(/<[^>]+>/g, "");//去掉所有的html标记
}

/**
 * 转换为浮点数，如果无法转换，则返回0
 * @param {*} v 
 */
export function toFloat(v) {
  if (v == null)
    return 0.0;
  if (typeof (v) == 'number')
    return v;
  var result = parseFloat(replaceAll(v, ',', ''));
  if (isNaN(result))
    return 0.0;
  return result;
}

/**
 * 转换为浮点数，带小数点
 * @param {*} value 
 * @param {Number} decimalPlace 
 */
export function toFloatWithDigits(value, decimalPlace) {
  return toFloat(toFloat(value).toFixed(decimalPlace));
}

//格式化数字，带小数点
export function formatFloat(value, decimalPlace) {
  if (decimalPlace == null)
    decimalPlace = 0;
  return toFloat(value).toFixed(decimalPlace);
}

/**
 * 转换为整数，如果无法转换，则返回0
 * @param {any} v 
 */
export function toInt(v) {
  return parseInt(toFloat(v));
}

/**
 * 转换为字符串，如果无法转换，则返回空字符串''
 * @param {*} v 
 */
export function toStr(v) {
  if (v == null)
    return '';
  return v + '';
}

/**
 * 转换为日期，如果无法转换，则返回null
 * @param {*} v 
 */
export function toDate(v) {
  if (v == null)
    return null;
  if (v instanceof Date)
    return v;
  if (typeof v == 'string') {
    v = v.replace(/-/g, '/');//微信小程序ios不兼容'-'时间格式,统一替换/
    var converted = Date.parse(v);
    return new Date(converted);
  }
  return null;
}

/**
* 转换为日期字符，如果无法转换，则返回null
* @param {Date} v 
* @param {String} fmt 
*/
export function toDateStr(v, fmt) {
  if (v == null)
    return null;
  if (v instanceof Date)
    return formatDate(v, fmt);;
  if (typeof v == 'string') {
    if (isNullOrEmpty(v)) {
      return null
    }
    v = v.replace(/-/g, '/');//微信小程序ios不兼容'-'时间格式,统一替换/
    var converted = Date.parse(v);
    return formatDate(new Date(converted), fmt);
  }
  return null;
}

/**
 * 令indexOf不区分大小写
 * @param {String} str1 
 * @param {String} str2 
 */
export function indexOfIgnore(str1, str2) {
  // if (str1.toUpperCase().IndexOf(str2.toUpperCase()) >= 0)
  if (str1.toLowerCase().indexOf(str2.toLowerCase()) >= 0)
    return true
  else
    return false
}


/**
 * 去除字符串两端空格
 * @param {String} s 
 */
export function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 字符数据校验
 * @param {String} str 
 * @param {String} type 
 */
export function checkStr(str, type) {
  switch (type) {
    case 'phone':   //手机号码
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    case 'tel':     //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'card':    //身份证
      return /^\d{15}|\d{18}$/.test(str);
    case 'pwd':     //密码以字母开头，长度在6~20之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,19}$/.test(str)
    case 'tc':     //tool-cipher 工具密码 6位数字或字母
      return /^[a-zA-Z\d]{5}$/.test(str)
    case 'postal':  //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case 'qq':      //QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case 'email':   //邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'money':   //金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case 'url':     //网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    case 'ip':      //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
    case 'date':    //日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
    case 'number':  //数字
      return /^[0-9]$/.test(str);
    case 'english': //英文
      return /^[a-zA-Z]+$/.test(str);
    case 'chinese': //中文
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case 'name':    //中文、数字、英文+空格
      return /^[\u4E00-\u9FA5A-Za-z0-9 ]+$/.test(str);
    case 'lower':   //小写
      return /^[a-z]+$/.test(str);
    case 'upper':   //大写
      return /^[A-Z]+$/.test(str);
    case 'html':    //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    case 'addr':    //匹配地区  省/市/自治区 -> 区/县/市/自治州/盟/地区 -> 市/县/旗/区 -> 
      return /([^省]+省|.+自治区)?([^自治州]+自治州|[^市]+市|[^盟]+盟|[^地区]+地区)?([^市]+市|[^县]+县|[^旗]+旗|.+区)?(.*)+$/.test(str);
    case 'local':   //切割地区  省/市/自治区 -> 区/县/市/自治州/盟/地区 -> 市/县/旗/区 -> 
      return str.match('^([^省]+省|.+自治区)?([^自治州]+自治州|[^市]+市|[^盟]+盟|[^地区]+地区)?([^市]+市|[^县]+县|[^旗]+旗|.+区)?(.*)+$');
    default:
      return true;
  }
}

/**
 * 判断文本是否有表情符
 * @param {String} substring
 */
export function isEmojiCharacter(substring) {
  for (var i = 0; i < substring.length; i++) {
    var hs = substring.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      var ls = substring.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
        || hs == 0x2b50) {
        return true;
      }
    }
  }
}

/**
 * 用正则表达式，将所有参数转化为对象，重复的参数作为数组
 * @param {String} url
*/
export function parseQuery(url) {
  var queryObj = {};
  var reg = /[?&]([^=&#]+)=([^&#]*)/g;
  var querys = url.match(reg);
  if (querys) {
    for (var i in querys) {
      var query = querys[i].split('=');
      var key = query[0].substr(1),
        value = query[1];
      queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
    }
  }
  return queryObj;
}

/**
 * 用正则表达式获取某个url中某个参数的值
 * @param {String} url 
 * @param {String} name 
 */
export function getUrlParams(url, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
  var r = url.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

