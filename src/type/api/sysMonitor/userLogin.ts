import { pageSelDto } from "@/type/tablePage.ts";

export interface userLoginSelDto extends pageSelDto {
}

export interface userLoginSelAllDto {
}

export interface userLoginInsDto {
  userId: string;
  loginIp?: string;
  loginPosition?: string;
  loginBrowser?: string;
  loginOs?: string;
  ifSuccess: string;
  remark?: string;
}

export interface userLoginUpdDto extends userLoginInsDto {
  id: number;
}
