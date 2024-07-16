import { pageDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class deptDto extends baseInterface {
  id!: number;
  label!: string;
  ifAdmin!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class deptSelDto extends pageDto {
}

export class deptSelAllDto {
}

export class deptInsDto {
  label!: string;
  ifAdmin!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class deptUpdDto extends deptInsDto {
  id!: number;
}
