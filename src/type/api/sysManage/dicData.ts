import { pageSelDto } from "@/type/tablePage.ts";

export interface dicDataSelDto extends pageSelDto {
}

export interface dicDataSelAllDto {
}

export interface dicDataInsDto {
  label: string;
  value: string;
  dicType: string;
  ifDefault: string;
  ifDisabled: string;
  orderNum: number;
  remark: string;
}

export interface dicDataUpdDto extends dicDataInsDto {
  id: number
}