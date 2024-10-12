export class FileConfigInterface {
  modelName!: string
  businessName!: string
}

export class ChooseTableTableInterface {
  rowIndex!: number
  tableNameEn!: string
  tableNameCn!: string
  tableNameEnInitial!: string
  tableNameCnInitial!: string
  cols!: ChooseTableTableColInterface[]
  fileConfig!: FileConfigInterface
}

export class ChooseTableTableColInterface {
  colName!: string
  colRemark!: string
  colType!: string
  ifMust!: boolean
  colInfo!: string
}

export const ChooseTableTableColInterfaceDict = {
  colName: '列名',
  colRemark: '列备注',
  colType: '列数据类型',
  ifMust: '是否必须',
  colInfo: 'prisma信息',
}
