export class axiosVo {
  res!: resVo
  status!: number
  statusText!: string
  headers!: any
  config!: any
  request!: any
  data!: any
}

export class resVo {
  code!: number
  data!: any
  msg!: string
}
