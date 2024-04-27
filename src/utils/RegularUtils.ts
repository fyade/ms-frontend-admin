// 获取文件名中除了后缀的部分
export function getFilenameWithoutSuffix(str: string) {
  const match = str.match(/^(.*)\.[^\.]+$/);
  if (match) {
    return match[1];
  }
  return str;
}