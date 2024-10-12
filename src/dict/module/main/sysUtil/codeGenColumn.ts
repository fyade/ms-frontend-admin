import { publicDict } from "@/utils/base.ts";
import { CodeGenColumnDto } from "@/type/module/main/sysUtil/codeGenColumn.ts";

export const codeGenColumnDict: { [P in keyof CodeGenColumnDto]: string } = {
  ...publicDict,
  tableId: '所属表',
  colName: '列名',
  colDescr: '字段描述',
  mysqlType: 'mysql类型',
  tsType: 'ts类型',
  tsName: 'ts属性',
  ifIns: '增',
  ifUpd: '改',
  ifSelOne: '查1',
  ifSelMore: '查n',
  ifRequired: '必填',
  selType: '查询方式',
  formType: '表单类型',
}
