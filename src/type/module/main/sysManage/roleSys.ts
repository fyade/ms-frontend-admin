import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class roleSysDto extends baseClass {
  id!: number;
  roleId!: number;
  sysId!: number;
  remark!: string;
}

export class roleSysSelDto extends pageDto {
}

export class roleSysSelAllDto {
}

export class roleSysInsDto {
  roleId!: number;
  sysId!: number;
  remark!: string;
}

export class roleSysUpdDto extends roleSysInsDto {
  id!: number;
}
