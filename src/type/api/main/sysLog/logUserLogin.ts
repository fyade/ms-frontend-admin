import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class logUserLoginDto extends baseClass {
  id!: number;
  userId!: string;
  loginIp!: string;
  loginPosition!: string;
  loginBrowser!: string;
  loginOs!: string;
  ifSuccess!: string;
  remark!: string;
}

export class logUserLoginSelDto extends pageDto {
}

export class logUserLoginSelAllDto {
}

export class logUserLoginInsDto {
  userId!: string;
  loginIp!: string;
  loginPosition!: string;
  loginBrowser!: string;
  loginOs!: string;
  ifSuccess!: string;
  remark!: string;
}

export class logUserLoginUpdDto extends logUserLoginInsDto {
  id!: number;
}
