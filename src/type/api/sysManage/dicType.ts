import { pageSelDto } from "@/type/tablePage.ts";

export interface dicTypeSelDto extends pageSelDto {
}

export interface dicTypeSelAllDto {
}

export interface dicTypeInsDto {
  name: string;
  type: string;
  if_disabled: string;
  order_num: number;
  remark: string;
}

export interface dicTypeUpdDto extends dicTypeInsDto {
  id: number
}