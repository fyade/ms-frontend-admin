const strArr = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'
]
const idsOfLengthStr: string[] = []

/**
 * 生成id
 */
export function genId(length: number = 16) {
  if (idsOfLengthStr.length >= Math.pow(strArr.length, length)) {
    throw new Error("数量过多，无法计算")
  }

  /**
   * 返回length位字符串，且不会跟之前返回过的重复（新方法
   * @returns {string}
   */
  function generateLengthStr() {
    let str = ''
    while (!!!str || idsOfLengthStr.includes(str)) {
      str = ''
      for (let i = 0; i < length; i++) {
        str += strArr[Math.floor(Math.random() * strArr.length)]
      }
    }
    idsOfLengthStr.push(str)
    return str
  }

  return `${generateLengthStr()}${new Date().getTime()}`
}