import axios from "axios";
import request, { fileBaseUrl } from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { FileUploadDto, FileUploadUpdDto } from "@/type/common/file.ts";

export class ParamsFileUploadOneChunkCheck {
  fileName!: string
  fileMd5!: string
  fileSize!: number
  chunkNum!: number
}

export class ParamsFileUploadOneChunkMerge {
  fileNewName!: string
  fileMd5!: string
}

export const fileUploadApi: ApiConfig<FileUploadDto, FileUploadUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/sys/file-upload',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/common/file-upload/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/common/file-upload/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/common/file-upload/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/common/file-upload',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/common/file-upload',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/common/file-upload/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/common/file-upload/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/common/file-upload',
    method: 'DELETE',
    data: ids
  })
}

/**
 * 单文件完整上传
 * @param file
 * @param fileName
 */
export function fileUploadOneFull(file: Blob, fileName: string = '') {
  const formData = new FormData();
  formData.append('file', file)
  formData.append('fileName', fileName)
  return request({
    url: `/main/sys/file-upload/one-full`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8'
    },
    data: formData
  })
}

/**
 * 上传头像
 * @param file
 * @param fileName
 */
export function fileUploadAvatar(file: Blob, fileName: string = '') {
  const formData = new FormData();
  formData.append('file', file)
  formData.append('fileName', fileName)
  return request({
    url: `/main/sys/file-upload/one-full-avatar`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8'
    },
    data: formData
  })
}

/**
 * 文件分片上传前置检查
 * @param data
 */
export function fileUploadOneChunk_check(data: ParamsFileUploadOneChunkCheck) {
  return request({
    url: '/main/sys/file-upload/one-chunk/check',
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
  file: Blob
}) {
  const formData = new FormData();
  formData.append('fileMd5', fileMd5)
  formData.append('fileNewName', fileNewName)
  formData.append('chunkIndex', `${chunkIndex}`)
  formData.append('file', file)
  return request({
    url: `/main/sys/file-upload/one-chunk/upload`,
    method: 'POST',
    headers:{
      'Content-Type': 'multipart/form-data;charset=utf-8'
    },
    data: formData
  })
}

/**
 * 分片合并
 * @param data
 */
export function fileUploadOneChunk_merge(data: ParamsFileUploadOneChunkMerge) {
  return request({
    url: '/main/sys/file-upload/one-chunk/merge',
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
