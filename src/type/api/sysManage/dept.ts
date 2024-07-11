import { pageSelDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class deptDto extends baseInterface {
  id!: number;
  label!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class deptSelDto extends pageSelDto {
}

export class deptSelAllDto {
}

export class deptInsDto {
  label!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class deptUpdDto {
  id!: number;
  label!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}
