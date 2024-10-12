import { BaseClass, PageDto } from "@/type/tablePage.ts";

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
