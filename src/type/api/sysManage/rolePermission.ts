import { pageSelDto } from "@/type/tablePage.ts";

export interface rolePermissionSelDto extends pageSelDto {
}

export interface rolePermissionInsDto {
  roleId: number;
  permissionId: number[];
  remark?: string;
}

export interface rolePermissionUpdDto extends rolePermissionInsDto {
  // id: number
}