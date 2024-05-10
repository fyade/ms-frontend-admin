import { pageSelDto } from "@/type/tablePage.ts";

export interface permissionSelDto extends pageSelDto {
}

export interface permissionInsDto {
  label: string;
  menu_id: number;
  order_num: number;
  remark: string;
}

export interface permissionUpdDto extends permissionInsDto {
  id: number
}