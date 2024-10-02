import request, { fileBaseUrl } from "./request";
import axios from "axios";

export class params_fileUploadOneChunk_check {
  fileName!: string
  fileMd5!: string
  fileSize!: number
  chunkNum!: number
}

export class params_fileUploadOneChunk_merge {
  fileNewName!: string
  fileMd5!: string
}

export function selList(params: any) {
  return request({
    url: '/main/sys-common/file-upload',
    method: 'GET',
    params
  })
}

/**
 * 单文件完整上传
 * @param file
 * @param fileName
 */
export function fileUploadOneFull(file: FormData, fileName: string = '') {
  return request({
    url: `/main/sys-common/file-upload/one-full${fileName ? `/${fileName}` : ''}`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8'
    },
    data: file
  })
}

/**
 * 上传头绪
 * @param file
 */
export function fileUploadAvatar(file: FormData) {
  return request({
    url: `/main/sys-common/file-upload/one-full-avatar`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8'
    },
    data: file
  })
}

/**
 * 文件分片上传前置检查
 * @param data
 */
export function fileUploadOneChunk_check(data: params_fileUploadOneChunk_check) {
  return request({
    url: '/main/sys-common/file-upload/one-chunk/check',
    method: 'POST',
    data
  })
}

/**
 * 文件分片上传
 * @param fileMd5
 * @param fileNewName
 * @param chunkIndex
 * @param file
 */
export function fileUploadOneChunk_upload({fileMd5, fileNewName, chunkIndex, file}: {
  fileMd5: string,
  fileNewName: string,
  chunkIndex: number,
  file: FormData
}) {
  return request({
    url: `/main/sys-common/file-upload/one-chunk/upload/${fileMd5}/${fileNewName}/${chunkIndex}`,
    method: 'POST',
    data: file
  })
}

/**
 * 分片合并
 * @param data
 */
export function fileUploadOneChunk_merge(data: params_fileUploadOneChunk_merge) {
  return request({
    url: '/main/sys-common/file-upload/one-chunk/merge',
    method: 'POST',
    data
  })
}

export function downloadFullFile(url: string, name: string, downloadProgress: Function): void {
  axios({
    url: `/main${fileBaseUrl}${url}`,
    method: 'GET',
    responseType: 'blob',
    onDownloadProgress: evt => {
      downloadProgress && downloadProgress(evt)
    }
  }).then(res => {
    const a = document.createElement('a')
    a.setAttribute('href', window.URL.createObjectURL(res.data))
    a.setAttribute('download', name)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })
}
