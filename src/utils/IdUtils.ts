const strArr = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

/**
 * 生成id
 * @param length
 * @param suffix
 */
export function genId(length = 16, suffix = true): string {
  /**
   * 返回length位字符串，且不会跟之前返回过的重复（新方法
   * @returns {string}
   */
  function generateLengthStr() {
    let str: string = '';
    for (let i = 0; i < length; i++) {
      str += strArr[Math.floor(Math.random() * strArr.length)];
    }
    return str;
  }

  return suffix ? `${generateLengthStr()}_${new Date().getTime()}` : generateLengthStr();
}
