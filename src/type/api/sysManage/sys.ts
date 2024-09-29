import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class sysDto extends baseClass {
  id!: number;
  name!: string;
  perms!: string;
  orderNum!: number;
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
  remark!: string;
}

export class sysUpdDto extends sysInsDto {
  id!: number;
}