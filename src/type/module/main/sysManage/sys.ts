import { BaseClass, PageDto, pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class sysDto extends baseClass {
  id!: number;
  name!: string;
  perms!: string;
  orderNum!: number;
  path!: string;
  ifDisabled!: string;
  remark!: string;
}

export class sysSelDto extends pageDto {
}

export class sysSelAllDto {
}

export class sysInsDto {
  name!: string;
  perms!: string;
  orderNum!: number;
  path!: string;
  ifDisabled!: string;
  remark!: string;
}

export class sysUpdDto extends sysInsDto {
  id!: number;
}

export class SysDto extends BaseClass {
  id!: number;
  name!: string;
  perms!: string;
  orderNum!: number;
  path!: string;
  ifDisabled!: string;
  remark!: string;
}

export class SysSelDto extends PageDto {
}

export class SysSelAllDto {
}

export class SysInsDto {
  name!: string;
  perms!: string;
  orderNum!: number;
  path!: string;
  ifDisabled!: string;
  remark!: string;
}

export class SysUpdDto extends SysInsDto {
  id!: number;
}
