import { pageSelDto } from "@/type/tablePage.ts";

export interface roleSelDto extends pageSelDto {
}

export interface roleSelDto2 {
  id?: number
}

export interface roleInsDto {
  label: string;
  order_num: number;
  remark: string;
}

export interface roleUpdDto extends roleInsDto {
  id: number
}