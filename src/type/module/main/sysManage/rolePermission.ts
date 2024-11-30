import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class RolePermissionDto extends BaseClass {
  id!: number;
  roleId!: number;
  permissionId!: number;
}

export class RolePermissionSelDto extends PageDto {
}

export class RolePermissionSelAllDto {
}

export class RolePermissionInsDto {
  roleId!: number;
  permissionId!: number;
}

export class RolePermissionUpdDto extends RolePermissionInsDto {
  id!: number;
}

export class RolePermissionUpdRpDto {
  roleId!: number;
  permissionId!: number[];
}
