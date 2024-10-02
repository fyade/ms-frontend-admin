import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class deptSysDto extends baseClass {
  id!: number;
  deptId!: number;
  sysId!: number;
  remark!: string;
}

export class deptSysSelDto extends pageDto {
}

export class deptSysSelAllDto {
}

export class deptSysInsDto {
  deptId!: number;
  sysId!: number;
  remark!: string;
}

export class deptSysUpdDto extends deptSysInsDto {
  id!: number;
}
