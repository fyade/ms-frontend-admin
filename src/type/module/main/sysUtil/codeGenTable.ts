import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class CodeGenTableDto extends BaseClass {
  id!: number;
  tableName!: string;
  tableDescr!: string;
  entityName!: string;
  tableRemark!: string;
  businessName!: string;
  moduleName!: string;
  businessNameCn!: string;
  moduleNameCn!: string;
  sysId!: number | undefined;
  orderNum!: number;
  remark!: string;
}

export class CodeGenTableSelDto extends PageDto {
}

export class CodeGenTableSelAllDto {
}

export class CodeGenTableInsDto {
  tableName!: string;
  tableDescr!: string;
  entityName!: string;
  tableRemark!: string;
  businessName!: string;
  moduleName!: string;
  businessNameCn!: string;
  moduleNameCn!: string;
  sysId!: number | undefined;
  orderNum!: number;
  remark!: string;
}

export class CodeGenTableUpdDto extends CodeGenTableInsDto {
  id!: number;
}
