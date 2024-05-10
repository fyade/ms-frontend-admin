import { pageSelDto } from "@/type/tablePage.ts";

export interface rolePermissionSelDto extends pageSelDto {
}

export interface rolePermissionInsDto {
  role_id: number;
  permission_id: number;
  remark: string;
}

export interface rolePermissionUpdDto extends rolePermissionInsDto {
  id: number
}