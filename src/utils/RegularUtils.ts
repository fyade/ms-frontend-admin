/**
 * 获取文件名中除了后缀的部分
 * @param str
 */
export function getFilenameWithoutSuffix(str: string) {
  const match = str.match(/^(.*)\.[^\.]+$/);
  if (match) {
    return match[1];
  }
  return str;
}

/**
 * 把url按照/分割
 * @param url
 */
export function splitUrlByX(url: string): string[] {
  return url.match(/\/[a-zA-Z0-9-]+/g) || []
}
