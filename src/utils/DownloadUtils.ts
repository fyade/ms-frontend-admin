/**
 * 从Blob下载文件
 * @param blob
 * @param fileName
 */
export function downloadFromBlob(blob: Blob, fileName: string) {
  // 创建一个临时的 URL 对象
  const url = URL.createObjectURL(blob);
  // 创建一个 a 标签用于下载
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  // 释放这个 URL 对象
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
