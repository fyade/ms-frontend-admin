/**
 * 二维数组转递归对象
 * @param list
 * @param key
 * @param defaultParent
 */
export function arr2ToDiguiObj(list: any[], key: string = 'parent_id', defaultParent = 0) {
  if (list.length === 0) {
    return []
  }
  const lis = list.filter(item => item[key] === defaultParent)
  const cachrarr = [lis]
  let finish = false
  while (!finish) {
    const ar = list.filter(item => cachrarr.flat().map(item => item.id).indexOf(item.id) === -1).filter(item => cachrarr[cachrarr.length - 1].map(item => item.id).indexOf(item.parent_id) > -1)
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
        obj.children = cachrarr[i].filter(item => item.parent_id = obj.id)
      })
    } else {
      ret.push(...cachrarr[0])
    }
  }
  return ret
}