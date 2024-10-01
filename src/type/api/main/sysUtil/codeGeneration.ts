export class fileConfigInterface {
  modelName!: string
  businessName!: string
}

export class chooseTableTableInterface {
  rowIndex!: number
  tableNameEn!: string
  tableNameCn!: string
  tableNameEnInitial!: string
  tableNameCnInitial!: string
  cols!: chooseTableTableColInterface[]
  fileConfig!: fileConfigInterface
}

export class chooseTableTableColInterface {
  colName!: string
  colRemark!: string
  colType!: string
  ifMust!: boolean
  colInfo!: string
}

export const chooseTableTableColInterfaceDict = {
  colName: '列名',
  colRemark: '列备注',
  colType: '列数据类型',
  ifMust: '是否必须',
  colInfo: 'prisma信息',
}
