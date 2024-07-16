export class fileConfigInter {
  modelName!: string
  businessName!: string
}

export class chooseTableTableIntre {
  rowIndex!: number
  tableNameEn!: string
  tableNameCn!: string
  tableNameEnInitial!: string
  tableNameCnInitial!: string
  cols!: chooseTableTableColIntre[]
  fileConfig!: fileConfigInter
}

export class chooseTableTableColIntre {
  colName!: string
  colRemark!: string
  colType!: string
  ifMust!: boolean
  colInfo!: string
}

export const chooseTableTableColIntreDict = {
  colName: '列名',
  colRemark: '列备注',
  colType: '列数据类型',
  ifMust: '是否必须',
  colInfo: 'prisma信息',
}
