/**
 * 类型
 * @param param
 * @returns
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
 * @param value
 */
export function deepClone<T>(value: T): T {
  const cache = new Map()

  function _deepClone(value: any) {
    if (value === null || typeof value !== 'object') {
      return value
    }
    if (cache.has(value)) {
      return cache.get(value)
    }
    // 构造函数及原型等可在这里做处理
    const result = Array.isArray(value) ? [] : {} as any
    cache.set(value, result)
    for (const key in value) {
      result[key] = _deepClone(value[key])
    }
    return result
  }

  return _deepClone(value)
}

/**
 * 返回删除数组特定下标位置的数据后的数组
 * @param arr
 * @param indices
 * @returns
 */
export function removeElementsByIndices<T>(arr: T[], ...indices: number[]): T[] {
  return arr.filter((_, index) => !indices.includes(index));
}

/**
 * 复制对象
 * @param to
 * @param from
 */
export function copyObject<T = object>(to: T, from: T) {
  for (const key in from) {
    to[key] = from[key]
  }
}

/**
 * 清除对象所有值
 * @param to
 */
export function clearObject<T = object>(to: T) {
  for (const key in to) {
    (to as Record<string, string>)![key] = ''
  }
}
