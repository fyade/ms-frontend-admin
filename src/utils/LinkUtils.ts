/**
 * 是否为网站链接
 * @param url
 * @param pre
 */
export function ifWebsiteLink(url: string, pre: string = '') {
  return url.startsWith(`${pre}https://`) || url.startsWith(`${pre}http://`)
}