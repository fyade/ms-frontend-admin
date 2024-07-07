/**
 * excel列名转序号
 * @param column
 */
export function excelColumnToNumber(column: string) {
  const columnLetters = column.toUpperCase(); // 将列字母转换为大写
  let result = 0;
  for (let i = 0; i < columnLetters.length; i++) {
    const char = columnLetters.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
    result = result * 26 + char;
  }
  return result;
}

/**
 * excel序号转列名
 * @param number
 */
export function numberToExcelColumn(number: number) {
  let result = '';
  while (number > 0) {
    const remainder = (number - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    number = Math.floor((number - 1) / 26);
  }
  return result;
}
