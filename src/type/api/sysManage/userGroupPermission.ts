import { pageDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class userGroupPermissionDto extends baseInterface {
  id!: number;
  userGroupId!: number;
  permissionId!: number;
  ifLimitRequestTimes!: string;
  ifRejectRequestUseUp!: string;
  ifLongTerm!: string;
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
  ifLimitRequestTimes!: string;
  ifRejectRequestUseUp!: string;
  ifLongTerm!: string;
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
