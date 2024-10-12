import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class UserGroupDto extends BaseClass {
  id!: number;
  label!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class UserGroupSelDto extends PageDto {
}

export class UserGroupSelAllDto {
}

export class UserGroupInsDto {
  label!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class UserGroupUpdDto extends UserGroupInsDto {
  id!: number;
}
