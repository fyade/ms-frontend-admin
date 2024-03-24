export interface axiosVo {
  res: resVo
  status: number
  statusText: string
  headers: any
  config: any
  request: any
  data: any
}

export interface resVo {
  code: number,
  data: any,
  msg: string
}
