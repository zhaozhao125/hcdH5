/**
 * 判断是否在两个日期之间
 * @param {Date} date1 开始日期
 * @param {Date} date2 结束日期
 */
export function isBetween(date1, date2) {
  let now = Date.now()
  let ret
  try {
    ret = now >= date1.getTime() && now < date2.getTime()
  } catch (err) {
    ret = false
  }
  return ret
}

/**
 * 充送活动是否在活动日期之间
 */
export function duringBonusDay() {
  return isBetween(new Date(2018, 9 - 1, 24, 0, 0, 0), new Date(2018, 10 - 1, 1, 0, 0, 0))
}

/**
 * 给个位数前加0
 * @param {Number} param 数据参数
 */
function addZero(param) {
  if (param < 10) {
    return '0' + param
  }
  return param
}

/**
 * 格式化时间
 * @param {timestamp} dateParam 13位时间戳
 * @param {String} type 格式化类型date/time/datetime
 */
export function formatDate(dateParam, type) {
  let d = new Date(dateParam)
  if (isNaN(d.getTime())) {
    return ''
  }
  let date = `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${d.getDate()}`
  let time = `${addZero(d.getHours())}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}`
  if (type == 'date') {
    return date
  } else if (type == 'time') {
    return time
  } else {
    return `${date} ${time}`
  }
}

/**
 * 判断手机号是否合法
 * @param {String} tel 手机号
 */
export function checkTel(tel) {
  let reg = /^((1[1-9][0-9])+\d{8})$/
  return reg.test(tel)
}

/**
 * encrypto 加密程序
 * @param {Strng} str 待加密字符串
 * @param {Number} xor 异或值
 * @param {Number} hex 加密后的进制数
 * @return {Strng} 加密后的字符串
 */
export function encrypto(str, xor, hex) {
  if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
    return
  }

  let resultList = []
  hex = hex <= 25 ? hex : hex % 25

  for (let i = 0; i < str.length; i++) {
    // 提取字符串每个字符的ascll码
    let charCode = str.charCodeAt(i)
    // 进行异或加密
    charCode = (charCode * 1) ^ xor
    // 异或加密后的字符转成 hex 位数的字符串
    charCode = charCode.toString(hex)
    resultList.push(charCode)
  }

  let splitStr = String.fromCharCode(hex + 97)
  let resultStr = resultList.join(splitStr)
  return resultStr
}

/**
 * decrypto 解密程序
 * @param {Strng} str 待加密字符串
 * @param {Number} xor 异或值
 * @param {Number} hex 加密后的进制数
 * @return {Strng} 加密后的字符串
 */
export function decrypto(str, xor, hex) {
  if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
    return
  }
  let strCharList = []
  let resultList = []
  hex = hex <= 25 ? hex : hex % 25
  // 解析出分割字符
  let splitStr = String.fromCharCode(hex + 97)
  // 分割出加密字符串的加密后的每个字符
  strCharList = str.split(splitStr)

  for (let i = 0; i < strCharList.length; i++) {
    // 将加密后的每个字符转成加密后的ascll码
    let charCode = parseInt(strCharList[i], hex)
    // 异或解密出原字符的ascll码
    charCode = (charCode * 1) ^ xor
    let strChar = String.fromCharCode(charCode)
    resultList.push(strChar)
  }
  let resultStr = resultList.join('')
  return resultStr
}
