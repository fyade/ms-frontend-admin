import { pageSelDto } from "@/type/tablePage.ts";

export interface userRoleSelDto extends pageSelDto {
  roleId?: string
}

export interface userRoleSelAllDto {
  userId?: string
  roleId?: number
}

export interface userRoleUpdURDto {
  userId: string;
  roleId: number[];
}

export interface userRoleUpdRUDto {
  userId: string[];
  roleId: number;
}
