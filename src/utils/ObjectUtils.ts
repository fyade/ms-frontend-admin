import { isProxy, toRaw } from "vue";

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
 * 是否vue组件
 * @param val
 */
export function ifVueComponent(val: any) {
  if (!val) {
    return false
  }
  return false
}

/**
 * 深克隆
 * @param value
 * @param ignoreKeys
 */
export function deepClone<T>(value: any, {
                               ignoreKeys = []
                             }: {
                               ignoreKeys?: string[]
                             } = {}
): T {
  const value1 = isProxy(value) ? toRaw(value) : value;

  function _deepClone(value: any, key?: string) {
    if ((key && ignoreKeys.includes(key)) || value === null || !['array', 'object'].includes(typeOf(value))) {
      return value
    }
    // =====
    // 构造函数及原型等可在这里做处理
    // =====
    const result = Array.isArray(value) ? [] : {} as any
    for (const key in value) {
      result[key] = _deepClone(value[key], key)
    }
    return result
  }

  return _deepClone(value1)
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
