import { pageDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class codeGenTableDto extends baseInterface {
  id!: number;
  tableName!: string;
  tableDescr!: string;
  entityName!: string;
  tableRemark!: string;
  businessName!: string;
  moduleName!: string;
  orderNum!: number;
  remark!: string;
}

export class codeGenTableSelDto extends pageDto {
}

export class codeGenTableSelAllDto {
}

export class codeGenTableInsDto {
  tableName!: string;
  tableDescr!: string;
  entityName!: string;
  tableRemark!: string;
  businessName!: string;
  moduleName!: string;
  orderNum!: number;
  remark!: string;
}

export class codeGenTableUpdDto extends codeGenTableInsDto {
  id!: number;
}
