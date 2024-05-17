import { pageSelDto } from "@/type/tablePage.ts";

export interface permissionSelDto extends pageSelDto {
}

export interface permissionInsDto {
  label: string;
  menuId: number;
  orderNum: number;
  remark: string;
}

export interface permissionUpdDto extends permissionInsDto {
  id: number
}