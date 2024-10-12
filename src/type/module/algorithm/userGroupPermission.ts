import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class UserGroupPermissionDto extends BaseClass {
  id!: number;
  userGroupId!: number;
  permissionId!: number;
  ifLongTerm!: string;
  ifLimitRequestTimes!: string;
  ifRejectRequestUseUp!: string;
  permissionStartTime!: Date;
  permissionEndTime!: Date;
  permissionTime?: any;
  limitRequestTimes!: number;
  ifUseUp!: string;
  orderNum!: number;
  remark!: string;
  count?: number;
}

export class UserGroupPermissionSelDto extends PageDto {
}

export class UserGroupPermissionSelAllDto {
}

export class UserGroupPermissionInsDto {
  userGroupId!: number;
  permissionId!: number;
  ifLongTerm!: string;
  ifLimitRequestTimes!: string;
  ifRejectRequestUseUp!: string;
  permissionStartTime!: Date;
  permissionEndTime!: Date;
  permissionTime?: any;
  limitRequestTimes!: number;
  ifUseUp!: string;
  orderNum!: number;
  remark!: string;
  count?: number;
}

export class UserGroupPermissionUpdDto extends UserGroupPermissionInsDto {
  id!: number;
}
