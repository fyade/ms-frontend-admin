interface fileUploadBaseInterface {
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

export interface fileUploadInterfaceOneChunkConcur extends fileUploadInterfaceOneChunk {
  progress_started: number,
  progress_ended: number,
}

export interface fileUploadInterfaceOneChunk extends fileUploadBaseInterface{
  chunkNum: number,
  chunkTotal: number,
  fileMd5: string,
  fileSize: number,
  fileNewName: string,
  progress_total: number,
}

export interface fileUploadInterfaceMoreFullConcur extends fileUploadBaseInterface {
  total: number,
  started: number,
  ended: number,
  beyondMaxSizeNum: number
}

export interface fileUploadInterfaceMoreChunk extends fileUploadBaseInterface {
  chunkNum: number,
  chunkTotal: number,
  fileNum: number,
  fileTotal: number,
  fileMd5: string,
  fileSize: number,
  fileNewName: string,
  progress_total: number,
}

export interface fileUploadInterfaceMoreChunkConcur extends fileUploadInterfaceMoreChunk {
  progress_started: number,
  progress_ended: number,
}
