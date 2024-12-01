import { BaseClass, PageDto } from "@/type/tablePage.ts";
import { RoleDto } from "@/type/module/main/sysManage/role.ts";
import { DeptDto } from "@/type/module/main/sysManage/dept.ts";
import { UserGroupDto } from "@/type/module/algorithm/userGroup.ts";

export class UserVisitorDto extends BaseClass {
  id!: string;
  username!: string;
  nickname!: string;
  password!: string;
  avatar!: string;
  sex!: string;
  email!: string;
  tel!: string;
}

export class UserVisitorSelDto extends PageDto {
  ifWithRole!: string
}

export class UserVisitorSelAllDto {
}

export class UserVisitorInsDto {
  username?: string;
  nickname?: string;
  password?: string;
  avatar?: string;
  sex?: string;
  email?: string;
  tel?: string;
}

export class UserVisitorUpdDto extends UserVisitorInsDto {
  id!: string;
}

export class UserVisitorDto2 {
  id!: string;
  username!: string;
  nickname!: string;
}

export class UserVisitorLoginDto {
  username!: string
  password!: string
}

export class UserVisitorRegistDto extends UserVisitorLoginDto {
}

export class AdminResetUserVisitorPsdDto {
  id!: string;
  password!: string;
}

export class UserVisitorDto_ extends UserVisitorDto {
  roles!: RoleDto[]
  depts!: DeptDto[]
  ugs!: UserGroupDto[]
}
