import { BaseClass, BaseClass2, PageDto } from "@/type/tablePage.ts";

export class FileUploadDto extends BaseClass {
  id!: string;
  fileName!: string;
  fileNewName!: string;
  fileSize!: number;
  fileMd5!: string;
  ifChunk!: string;
  chunkNum!: number;
  ifMerge!: string;
  ifFirst!: string;
  ifFinished!: string;
  module!: string;
  remark!: string;
}

export class FileUploadSelDto extends PageDto {
}

export class FileUploadSelAllDto {
}

export class FileUploadInsDto {
  fileName!: string;
  fileNewName!: string;
  fileSize!: number;
  fileMd5!: string;
  ifChunk!: string;
  chunkNum!: number;
  ifMerge!: string;
  ifFirst!: string;
  ifFinished!: string;
  module!: string;
  remark!: string;
}

export class FileUploadUpdDto extends FileUploadInsDto {
  id!: string;
}

export class FileDto2 extends BaseClass {
  id!: string;
  fileName!: string;
  fileNewName!: string;
  fileSize!: string;
  fileMd5!: string;
  ifChunk!: string;
  chunkNum!: number;
  ifMerge!: string;
  ifFirst!: string;
  ifFinished!: string;
  module!: string;
  remark!: string;
}
