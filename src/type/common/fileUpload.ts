interface FileUploadBaseInterface {
  currentStage: 'o' | 'a' | 'b' | 'c' | 'd' | 'e',
  dictStage: {
    o: string,
    a: string,
    b: string,
    c: string,
    e: string,
    d: string,
  },
}

export interface FileUploadInterfaceOneChunkConcur extends FileUploadInterfaceOneChunk {
  progress_started: number,
  progress_ended: number,
}

export interface FileUploadInterfaceOneChunk extends FileUploadBaseInterface{
  chunkNum: number,
  chunkTotal: number,
  fileMd5: string,
  fileSize: number,
  fileNewName: string,
  progress_total: number,
}

export interface FileUploadInterfaceMoreFullConcur extends FileUploadBaseInterface {
  total: number,
  started: number,
  ended: number,
  beyondMaxSizeNum: number
}

export interface FileUploadInterfaceMoreChunk extends FileUploadBaseInterface {
  chunkNum: number,
  chunkTotal: number,
  fileNum: number,
  fileTotal: number,
  fileMd5: string,
  fileSize: number,
  fileNewName: string,
  progress_total: number,
}

export interface FileUploadInterfaceMoreChunkConcur extends FileUploadInterfaceMoreChunk {
  progress_started: number,
  progress_ended: number,
}
