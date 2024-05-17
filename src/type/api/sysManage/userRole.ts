import { pageSelDto } from "@/type/tablePage.ts";

export interface userRoleSelDto extends pageSelDto {
}

export interface userRoleInsDto {
  userId: string;
  roleId: number[];
}

export interface userRoleUpdDto extends userRoleInsDto {
}