import { pageSelDto } from "@/type/tablePage.ts";

export interface dicDataSelDto extends pageSelDto {
}

export interface dicDataSelAllDto {
}

export interface dicDataInsDto {
  label: string;
  value: string;
  dic_type: string;
  if_default: string;
  if_disabled: string;
  order_num: number;
  remark: string;
}

export interface dicDataUpdDto extends dicDataInsDto {
  id: number
}