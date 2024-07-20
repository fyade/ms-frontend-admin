import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class userUserGroupDto extends baseClass {
  id!: number;
  userId!: string;
  userGroupId!: number;
  remark!: string;
}

export class userUserGroupSelDto extends pageDto {
  userGroupId!: number;
}

export class userUserGroupSelAllDto {
}

export class userUserGroupInsDto {
  userId!: string;
  userGroupId!: number;
  remark!: string;
}

export class userUserGroupUpdDto {
  id!: number;
  userId!: string;
  userGroupId!: number;
  remark!: string;
}

export class userUserGroupUpdUUGDtp {
  userId!: string;
  userGroupId!: number[];
  remark?: string;
}

export class userUserGroupUpdUGUDtp {
  userId!: string[];
  userGroupId!: number;
  remark?: string;
}
