import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class LogAlgorithmCallDto extends BaseClass {
  id!: number;
  userGroupPermissionId!: number;
  perms!: string;
  userId!: string;
  callIp!: string;
  ifSuccess!: string;
  loginRole!: string;
  remark!: string;
}

export class LogAlgorithmCallSelDto extends PageDto {
}

export class LogAlgorithmCallSelAllDto {
}

export class LogAlgorithmCallInsDto {
  userGroupPermissionId!: number;
  perms!: string;
  userId!: string;
  callIp!: string;
  ifSuccess!: string;
  loginRole!: string;
  remark!: string;
}

export class LogAlgorithmCallUpdDto extends LogAlgorithmCallInsDto {
  id!: number;
}
