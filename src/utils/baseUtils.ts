/**
 * 深克隆
 * @param any
 */
export function deepClone<T>(any: any): T {
  return JSON.parse(JSON.stringify(any))
}

/**
 * 二维数组转递归对象
 * @param list
 * @param key
 * @param defaultParent
 */
export function arr2ToDiguiObj(list: any[], key: string = 'parent_id', defaultParent = 0) {
  const list2 = deepClone<any[]>(list)
  if (list2.length === 0) {
    return []
  }
  const lis = list2.filter(item => item[key] === defaultParent)
  const cachrarr = [lis]
  let finish = false
  while (!finish) {
    const ar = list2.filter(item => cachrarr.flat().map(item => item.id).indexOf(item.id) === -1).filter(item => cachrarr[cachrarr.length - 1].map(item => item.id).indexOf(item.parent_id) > -1)
    if (ar.length === 0) {
      finish = true
    } else {
      cachrarr.push(ar)
    }
  }
  const ret = []
  if (cachrarr.length === 1) {
    return cachrarr[0]
  }
  for (let i = cachrarr.length - 1; i >= 0; i--) {
    if (i !== 0) {
      cachrarr[i - 1].forEach(obj => {
        obj.children = cachrarr[i].filter(item => item.parent_id === obj.id)
      })
    } else {
      ret.push(...cachrarr[0])
    }
  }
  return ret
}

/**
 * 递归对象转二维数组
 * @param objs
 * @param key
 * @param jumppaths
 */
export function diguiObjTo2Arr(objs: any[], key: string = 'children', jumppaths = ['']) {
  return diguiObjTo2Arr_(objs, key, [], [], jumppaths)
}

function diguiObjTo2Arr_(objs: any[], key: string, ret: any[] = [], parents: any[] = [], jumppaths = ['']) {
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i]
    if (jumppaths.indexOf(obj.path) > -1) {
      continue
    }
    if (obj[key] && obj[key].length > 0) {
      ret.push([...parents, obj])
      diguiObjTo2Arr_(obj[key], key, ret, [...parents, obj])
    } else {
      ret.push([...parents, obj])
    }
  }
  return ret
}
