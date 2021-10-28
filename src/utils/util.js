import moment from 'moment';

// 1.获取路径参数的方法 返回参数值
export function getQueryString(name, url) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  // window.location.search 获取url问号后面的部分
  let arr = [];
  if (url) {
    arr = url.split('?')[2].match(reg);
  } else {
    arr = window.location.search.substr(1).match(reg);
  }
  return arr !== null ? unescape(arr[2]) : null;
}

// 2.设置localStorage
export function setLocalStorage(name, value) {
  let valueResult = '';
  if (typeof value !== 'string') {
    valueResult = JSON.stringify(value);
  }
  localStorage.setItem(name, valueResult);
}

// 3.获取localStorage
export function getLocalStorage(name) {
  return localStorage.getItem(name);
}

// 4.删除localStorage
export function delLocalStorage(name) {
  localStorage.removeItem(name);
}

// 5.清空localStorage
export function clearLocalStorage() {
  localStorage.clear();
}

// 6.获取hash历史数据参数
export function getHashHistory(key = null) {
  const searchHash = decodeURIComponent(window.location.hash.slice(1));
  let params = {};
  try {
    params = JSON.parse(searchHash);
  } catch (ex) {
    params = {};
  }
  if (key === null) {
    return params;
  }
  if (key in params) {
    return params[key];
  }
  return null;
}

// 7.设置hash历史数据参数
export function setHashHistory(newParams, clear = false) {
  const params = getHashHistory();
  if (clear) {
    window.history.replaceState(null, '', `#${JSON.stringify({ ...newParams })}`);
  } else {
    window.history.replaceState(
      null,
      '',
      `#${JSON.stringify({ ...params, ...newParams })}`,
    );
  }
}

// 8.输入一个值，返回其数据类型
export function type(params) {
  return Object.prototype.toString.call(params).slice(8, -1).toLowerCase();
}

const emptyString = 'null undefined NaN [] {}'.split(' ');
// 9.判断变量是否为空
export function isEmpty(obj, stringJudge = false) {
  const t = type(obj);
  if (t === 'null' || t === 'undefined') {
    return true;
  }
  if (t === 'number' && obj.length === 0) {
    return true;
  }
  if (t === 'object') {
    try {
      if (JSON.stringify(obj) === '{}') {
        return true;
      }
    } catch (error) {
      console.log('非空，但是解析失败');
    }
  }
  if (t === 'string' && obj === '') {
    return true;
  }
  if (stringJudge && t === 'string' && emptyString.indexOf(obj) > -1) {
    return true;
  }
  return false;
}

// 10.获取视口尺寸
export function getViewportOffset() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  // ie8及其以下
  if (document.compatMode === 'BackCompat') {
    // 怪异模式
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    };
  }
  // 标准模式
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
}

// 11.处理时间
export function formatMoment(date, formatLabel = 'YYYY-MM-DD') {
  if (isEmpty(date)) {
    return moment().format(formatLabel);
  }
  return moment(date).format(formatLabel);
}
