export const selectFiles = (function createSelectFiles() {
  if ('showOpenFilePicker' in window) {
    return async (isMultiple: boolean = false): Promise<File[]> => {
      const fileHandles = await window.showOpenFilePicker({
        multiple: isMultiple,
      });
      return await Promise.all(fileHandles.map(handle => handle.getFile()));
    }
  } else {
    return async (isMultiple: boolean = false): Promise<File[]> => {
      return new Promise<File[]>((resolve) => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.style.display = 'none'; // 隐藏输入元素
        if (isMultiple) {
          inputElement.multiple = true;
        }
        inputElement.addEventListener('change', () => {
          const selectedFiles = Array.from(inputElement.files || []);
          inputElement.remove();
          resolve(selectedFiles);
        });
        document.body.appendChild(inputElement); // 将输入元素添加到文档中
        inputElement.click(); // 触发文件选择对话框
      });
    }
  }
})()

/**
 * blob转文件
 * @param blob
 * @param fileName
 * @param type
 */
export const blobToFile = (blob: Blob, fileName: string, type: string): File => {
  return new File([blob], fileName, {type})
}
