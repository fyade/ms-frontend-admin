import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class logAlgorithmCallDto extends baseClass {
  id!: number;
  userGroupPermissionId!: number;
  userId!: string;
  callIp!: string;
  ifSuccess!: string;
  remark!: string;
}

export class logAlgorithmCallSelDto extends pageDto {
}

export class logAlgorithmCallSelAllDto {
}

export class logAlgorithmCallInsDto {
  userGroupPermissionId!: number;
  userId!: string;
  callIp!: string;
  ifSuccess!: string;
  remark!: string;
}

export class logAlgorithmCallUpdDto extends logAlgorithmCallInsDto {
  id!: number;
}
