
/**
 * 时间格式函数 
 * @export
 * @param {any} date 
 * @param {any} fmt 
 * @returns 
 */
export function formateDate(date,fmt) {
  var $this = new Date(date)
  var o = {
    "M+": $this.getMonth() + 1, //月份 
    "d+": $this.getDate(), //日 
    "h+": $this.getHours(), //小时 
    "m+": $this.getMinutes(), //分 
    "s+": $this.getSeconds(), //秒 
    "q+": Math.floor(($this.getMonth() + 3) / 3), //季度 
    "S": $this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ($this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 是否有相应的className
 * @export
 * @param {any} el 
 * @param {any} className 
 * @returns 
 */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 检测是否未空
 * @export
 * @param {any} query 
 * @returns 
 */
export function isNull(query,errInfo='暂无数据') {
  if (query || parseInt(query) === 0) {
    return query
  }
  return errInfo
}

/**
 * 时间比较函数，时间格式暂时为xxxx-xx-xx
 * @export
 * @param {any} time 
 * @param {any} comparetime 
 * @returns 
 */
export function compareTime(time, comparetime) {
  var arr = time.split("-")
  var starttime = new Date(arr[0], arr[1], arr[2])
  var starttimes = starttime.getTime()
  var arrs = comparetime.split("-")
  var lktime = new Date(arrs[0], arrs[1], arrs[2])
  var lktimes = lktime.getTime()
  if (starttimes === lktimes) {
    return 2
  } else if (starttimes > lktimes) {
    return 3
  }
  if (starttimes < lktimes) {
    return 1
  }
}