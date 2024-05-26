export type setColumnType = {
  id: number | string,
  tableId: number | string,
  colName: string,
  colDescr: string,
  mysqlType: string,
  tsType: string,
  tsName: string,
  ifIns: string,
  ifUpd: string,
  ifSelOne: string,
  ifSelMore: string,
  ifRequired: string,
  formType: string,
  selType: string,
  orderNum: number
};

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
  colName: string
  colRemark: string
  colType: string
  ifMust: boolean
  colInfo: string
}

export const chooseTableTableColIntreDict = {
  colName: '列名',
  colRemark: '列备注',
  colType: '列数据类型',
  ifMust: '是否必须',
  colInfo: 'prisma信息',
}