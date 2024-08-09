import { baseClass, baseClass2 } from "@/utils/base.ts";

export class fileDto extends baseClass {
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

export class fileDto2 extends baseClass2 {
  id!: string;
  file_name!: string;
  file_new_name!: string;
  file_size!: string;
  file_md5!: string;
  if_chunk!: string;
  chunk_num!: number;
  if_merge!: string;
  if_first!: string;
  if_finished!: string;
  module!: string;
  remark!: string;
}
