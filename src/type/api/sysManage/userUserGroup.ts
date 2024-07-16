import { pageSelDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class userUserGroupDto extends baseInterface {
  id!: number;
  userId!: string;
  userGroupId!: number;
  remark!: string;
}

export class userUserGroupSelDto extends pageSelDto {
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
