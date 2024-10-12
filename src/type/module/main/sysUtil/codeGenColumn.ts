import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class CodeGenColumnDto extends BaseClass {
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

export class CodeGenColumnSelDto extends PageDto {
}

export class CodeGenColumnSelAllDto {
}

export class CodeGenColumnInsDto {
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

export class CodeGenColumnUpdDto extends CodeGenColumnInsDto {
  id!: number;
}
