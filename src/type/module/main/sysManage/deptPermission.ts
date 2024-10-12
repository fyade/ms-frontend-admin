import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class DeptPermissionDto extends BaseClass {
  id!: number;
  deptId!: number;
  type!: string;
  permissionId!: number;
  remark!: string;
}

export class DeptPermissionSelDto extends PageDto {
}

export class DeptPermissionSelAllDto {
}

export class DeptPermissionInsDto {
  deptId!: number;
  type!: string;
  permissionId!: number;
  remark!: string;
}

export class DeptPermissionUpdDto extends DeptPermissionInsDto {
  id!: number;
}

export class DeptPermissionUpdDPDto {
  deptId!: number;
  permissionId!: number[];
}
