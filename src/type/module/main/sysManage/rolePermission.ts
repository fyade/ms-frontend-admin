import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class RolePermissionDto extends BaseClass {
  id!: number;
  roleId!: number;
  type!: string;
  permissionId!: number;
  remark!: string;
}

export class RolePermissionSelDto extends PageDto {
}

export class RolePermissionSelAllDto {
}

export class RolePermissionInsDto {
  roleId!: number;
  type!: string;
  permissionId!: number;
  remark!: string;
}

export class RolePermissionUpdDto extends RolePermissionInsDto {
  id!: number;
}

export class RolePermissionUpdRpDto {
  roleId!: number;
  permissionId!: number[];
}
