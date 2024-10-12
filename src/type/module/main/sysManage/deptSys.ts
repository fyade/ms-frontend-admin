import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class DeptSysDto extends BaseClass {
  id!: number;
  deptId!: number;
  sysId!: number;
  remark!: string;
}

export class DeptSysSelDto extends PageDto {
}

export class DeptSysSelAllDto {
}

export class DeptSysInsDto {
  deptId!: number;
  sysId!: number;
  remark!: string;
}

export class DeptSysUpdDto extends DeptSysInsDto {
  id!: number;
}
