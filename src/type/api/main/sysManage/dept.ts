import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class deptDto extends baseClass {
  id!: number;
  label!: string;
  ifAdmin!: string;
  ifDisabled!: string;
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
  ifDisabled!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class deptUpdDto extends deptInsDto {
  id!: number;
}
