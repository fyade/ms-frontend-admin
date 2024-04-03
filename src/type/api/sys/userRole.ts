import { pageSelDto } from "@/type/tablePage.ts";

export interface userRoleSelDto extends pageSelDto {
}

export interface userRoleInsDto {
  user_id: string;
  role_id: number;
  remark: string;
}

export interface userRoleUpdDto extends userRoleInsDto {
  id: number
}