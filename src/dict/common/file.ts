import { publicDict } from "@/utils/base.ts";
import { FileUploadDto } from "@/type/common/file.ts";

export const fileUploadDict: { [P in keyof FileUploadDto]: string } = {
  ...publicDict,
  fileName: '原文件名',
  fileNewName: '新文件名',
  fileSize: '文件大小',
  fileMd5: '文件md5',
  ifChunk: '是否分片',
  chunkNum: '分片数量',
  ifMerge: '是否合并',
  ifFirst: '是否首次上传',
  ifFinished: '是否上传结束',
  module: '业务模块',
}
