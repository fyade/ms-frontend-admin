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
 * 从 html 文本中提取 script 标签及其 src 指向的地址
 * @param html
 */
export function getScriptTagFromHtmlText(html: string) {
  const regex = /<script\s+[^>]*src="([^"]+)"[^>]*>/gi;
  let match;
  const arr = [];
  while ((match = regex.exec(html)) !== null) {
    arr.push(match[1]); // 捕获的 src 属性值
  }
  return arr
}

/**
 * 把url按照/分割
 * @param url
 */
export function splitUrlByX(url: string): string[] {
  return url.match(/\/[a-zA-Z0-9-]+/g) || []
}
