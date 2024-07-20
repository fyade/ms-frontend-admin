import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class userGroupPermissionDto extends baseClass {
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
  remark!: string;
}

export class userGroupPermissionSelDto extends pageDto {
}

export class userGroupPermissionSelAllDto {
}

export class userGroupPermissionInsDto {
  userGroupId!: number;
  permissionId!: number;
  ifLongTerm!: string;
  ifLimitRequestTimes!: string;
  ifRejectRequestUseUp!: string;
  permissionStartTime!: string;
  permissionEndTime!: string;
  permissionTime?: string;
  limitRequestTimes!: number;
  ifUseUp!: string;
  remark!: string;
}

export class userGroupPermissionUpdDto extends userGroupPermissionInsDto {
  id!: number;
}
