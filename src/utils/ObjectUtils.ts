/**
 * 类型
 * @param param
 */
export function typeOf(param: any) {
  if (typeof param === 'object') {
    return Object.prototype.toString.call(param).slice(8, -1).toLowerCase()
  } else {
    return typeof param
  }
}

/**
 * 是否null
 * @param val
 * @returns {boolean}
 */
export function ifNull(val: any) {
  return val === null
}

/**
 * 是否非null
 * @param val
 * @returns {boolean}
 */
export function ifNotNull(val: any) {
  return !ifNull(val)
}

/**
 * 是否undefined
 * @param val
 * @returns {boolean}
 */
export function ifUndefined(val: any) {
  return val === void 0
}

/**
 * 是否非undefined
 * @param val
 * @returns {boolean}
 */
export function ifNotUndefined(val: any) {
  return !ifUndefined(val)
}

/**
 * 是否有效
 * @param val
 * @returns {boolean}
 */
export function ifValid(val: any) {
  return ifNotNull(val) && ifNotUndefined(val)
}

/**
 * 是否无效
 * @param val
 * @returns {boolean}
 */
export function ifNotValid(val: any) {
  return !ifValid(val)
}

/**
 * 深克隆
 * @param any
 */
export function deepClone<T>(any: any): T {
  return JSON.parse(JSON.stringify(any))
}