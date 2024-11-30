import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class RoleSysDto extends BaseClass {
  id!: number;
  roleId!: number;
  sysId!: number;
}

export class RoleSysSelDto extends PageDto {
}

export class RoleSysSelAllDto {
}

export class RoleSysInsDto {
  roleId!: number;
  sysId!: number;
}

export class RoleSysUpdDto extends RoleSysInsDto {
  id!: number;
}
