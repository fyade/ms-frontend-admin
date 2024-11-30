import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class UserUserGroupDto extends BaseClass {
  id!: number;
  userId!: string;
  userGroupId!: number;
}

export class UserUserGroupSelDto extends PageDto {
}

export class UserUserGroupSelAllDto {
}

export class UserUserGroupInsDto {
  userId!: string;
  userGroupId!: number;
}

export class UserUserGroupUpdDto extends UserUserGroupInsDto {
  id!: number;
}

export class UserUserGroupUpdUUGDtp {
  userId!: string;
  userGroupId!: number[];
}

export class UserUserGroupUpdUGUDtp {
  userId!: string[];
  userGroupId!: number;
}
