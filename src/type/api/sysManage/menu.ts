import { pageSelDto } from "@/type/tablePage.ts";

export interface menuSelDto extends pageSelDto {
}

export interface menuInsDto {
  label: string;
  type: string;
  path: string;
  parentId: number;
  component: string;
  icon: string;
  orderNum: number;
  ifLink: string;
  ifVisible: string;
  ifDisabled: string;
  ifPublic: string;
  perms: string;
  remark: string;
}

export interface menuUpdDto extends menuInsDto {
  id: number
}