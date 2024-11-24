import { BaseClass, PageDto } from "@/type/tablePage.ts";
import { RoleDto } from "@/type/module/main/sysManage/role.ts";
import { DeptDto } from "@/type/module/main/sysManage/dept.ts";
import { UserGroupDto } from "@/type/module/algorithm/userGroup.ts";

export class UserDto extends BaseClass {
  id!: string;
  username!: string;
  nickname!: string;
  password!: string;
  avatar!: string;
  sex!: string;
  email!: string;
  tel!: string;
}

export class UserSelDto extends PageDto {
  ifWithRole!: string
}

export class UserSelAllDto {
}

export class UserInsDto {
  username?: string;
  nickname?: string;
  password?: string;
  avatar?: string;
  sex?: string;
  email?: string;
  tel?: string;
}

export class UserUpdDto extends UserInsDto {
  id!: string;
}

export class UserDto2 {
  id!: string;
  username!: string;
  nickname!: string;
}

export class LoginDto {
  username!: string
  password!: string
}

export class RegistDto extends LoginDto {
}

export class UserUpdPsdDto {
  oldp!: string
  newp1!: string
  newp2!: string
}

export class AdminResetUserPsdDto {
  id!: string
  password!: string
}

export class UserDto_ extends UserDto {
  roles!: RoleDto[]
  depts!: DeptDto[]
  ugs!: UserGroupDto[]
}
