import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class rolePermissionDto extends baseClass {
  id!: number;
  roleId!: number;
  type!: string;
  permissionId!: number;
  remark!: string;
}

export class rolePermissionSelDto extends pageDto {
}

export class rolePermissionInsDto {
  roleId!: number;
  permissionId!: number[];
  remark?: string;
}

export class rolePermissionUpdDto extends rolePermissionInsDto {
  // id: number
}
