export interface chooseTableTableIntre {
  rowIndex: number
  tableNameEn: string
  tableNameCn: string
  tableNameEnInitial: string
  tableNameCnInitial: string
  cols: chooseTableTableColIntre[]
}

export interface chooseTableTableColIntre {
  colInfo: string
  colName: string
  colRemark: string
  colType: string
  ifMust: boolean
}