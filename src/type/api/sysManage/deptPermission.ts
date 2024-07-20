import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class deptPermissionDto extends baseClass {
  id!: number;
  deptId!: number;
  type!: string;
  permissionId!: number;
  remark!: string;
}

export class deptPermissionSelDto extends pageDto {
}

export class deptPermissionSelAllDto {
}

export class deptPermissionInsDto {
  deptId!: number;
  type!: string;
  permissionId!: number;
  remark!: string;
}

export class deptPermissionUpdDto {
  id!: number;
  deptId!: number;
  type!: string;
  permissionId!: number;
  remark!: string;
}

export class updManyDPDto {
  deptId!: number;
  permissionId!: number[];
}
