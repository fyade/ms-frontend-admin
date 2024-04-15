/**
 * 深克隆
 * @param any
 */
export function deepClone<T>(any: any): T {
  return JSON.parse(JSON.stringify(any))
}

/**
 * 转换为path
 * @param str
 */
export function toPath(...str: string[]): string {
  return str.join('/').replace(/\/+/g, '/');
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
export function diguiObjToArr2(objs: any[], key: string = 'children', jumppaths = ['']) {
  return diguiObjToArr2_(objs, key, [], [], jumppaths)
}

function diguiObjToArr2_(objs: any[], key: string, ret: any[] = [], parents: any[] = [], jumppaths = ['']) {
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i]
    if (jumppaths.indexOf(obj.path) > -1) {
      continue
    }
    if (obj[key] && obj[key].length > 0) {
      ret.push([...parents, obj])
      diguiObjToArr2_(obj[key], key, ret, [...parents, obj])
    } else {
      ret.push([...parents, obj])
    }
  }
  return ret
}

/**
 * 一维数组递归找关系
 * @param objs
 * @param pkey
 * @param ckey
 */
export function arr1GetDiguiRelation(objs: any[], {
                                       pkey = 'parent_id',
                                       ckey = 'children'
                                     }: {
                                       pkey?: string,
                                       ckey?: string
                                     } = {}
) {
  objs.forEach(obj => {
    const childrens: any[][] = []
    childrens.push(objs.filter(item => item[pkey] === obj.id))
    while (childrens[childrens.length - 1].length > 0) {
      childrens.push(objs.filter(item => childrens[childrens.length - 1].map(item => item.id).indexOf(item[pkey]) > -1))
    }
    obj[ckey] = childrens.flat().map(item => item.id)
  })
  return objs
}
