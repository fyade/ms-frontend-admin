import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class codeGenColumnDto extends baseClass {
  id!: number;
  tableId!: number;
  colName!: string;
  colDescr!: string;
  mysqlType!: string;
  tsType!: string;
  tsName!: string;
  ifIns!: string;
  ifUpd!: string;
  ifSelOne!: string;
  ifSelMore!: string;
  ifRequired!: string;
  selType!: string;
  formType!: string;
  orderNum!: number;
  remark!: string;
}

export class codeGenColumnSelDto extends pageDto {
}

export class codeGenColumnSelAllDto {
}

export class codeGenColumnInsDto {
  colName!: string;
  colDescr!: string;
  mysqlType!: string;
  tsType!: string;
  tsName!: string;
  ifIns!: string;
  ifUpd!: string;
  ifSelOne!: string;
  ifSelMore!: string;
  ifRequired!: string;
  selType!: string;
  formType!: string;
  orderNum!: number;
  remark!: string;
}

export class codeGenColumnUpdDto extends codeGenColumnInsDto {
  id!: number;
}
