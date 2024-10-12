import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class UserUserGroupDto extends BaseClass {
  id!: number;
  userId!: string;
  userGroupId!: number;
  remark!: string;
}

export class UserUserGroupSelDto extends PageDto {
}

export class UserUserGroupSelAllDto {
}

export class UserUserGroupInsDto {
  userId!: string;
  userGroupId!: number;
  remark!: string;
}

export class UserUserGroupUpdDto extends UserUserGroupInsDto {
  id!: number;
}

export class UserUserGroupUpdUUGDtp {
  userId!: string;
  userGroupId!: number[];
  remark?: string;
}

export class UserUserGroupUpdUGUDtp {
  userId!: string[];
  userGroupId!: number;
  remark?: string;
}
