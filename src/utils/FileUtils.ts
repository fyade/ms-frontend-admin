/**
 * blob转文件
 * @param blob
 * @param fileName
 * @param type
 */
export const blobToFile = (blob: Blob, fileName: string, type: any): File => {
  return new File([blob], fileName, {type})
}
