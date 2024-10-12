import { publicDict } from "@/utils/base.ts";
import { CodeGenTableDto } from "@/type/module/main/sysUtil/codeGenTable.ts";

export const codeGenTableDict: { [P in keyof CodeGenTableDto]: string } = {
  ...publicDict,
  tableName: '表名',
  tableDescr: '表描述',
  entityName: '实体类名',
  tableRemark: '表备注',
  businessName: '业务名',
  moduleName: '模块名',
  businessNameCn: '业务名中文',
  moduleNameCn: '模块名中文',
  sysId: '所属系统',
}
