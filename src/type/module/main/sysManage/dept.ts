import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class DeptDto extends BaseClass {
  id!: number;
  label!: string;
  ifAdmin!: string;
  ifDisabled!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class DeptSelDto extends PageDto {
}

export class DeptSelAllDto {
}

export class DeptInsDto {
  label!: string;
  ifAdmin!: string;
  ifDisabled!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class DeptUpdDto extends DeptInsDto {
  id!: number;
}
