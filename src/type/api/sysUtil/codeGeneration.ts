export interface fileConfigInter {
  modelName: string
  businessName: string
}

export interface chooseTableTableIntre {
  rowIndex: number
  tableNameEn: string
  tableNameCn: string
  tableNameEnInitial: string
  tableNameCnInitial: string
  cols: chooseTableTableColIntre[]
  fileConfig: fileConfigInter
}

export interface chooseTableTableColIntre {
  colInfo: string
  colName: string
  colRemark: string
  colType: string
  ifMust: boolean
}