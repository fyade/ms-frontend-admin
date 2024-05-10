import { pageSelDto } from "@/type/tablePage.ts";

export interface menuSelDto extends pageSelDto {
}

export interface menuInsDto {
  label: string;
  type: string;
  path: string;
  parent_id: number;
  component: string;
  icon: string;
  order_num: number;
  if_link: string;
  if_visible: string;
  if_disabled: string;
  if_public: string;
  perms: string;
  remark: string;
}

export interface menuUpdDto extends menuInsDto {
  id: number
}