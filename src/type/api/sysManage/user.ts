import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";
import { roleDto } from "@/type/api/sysManage/role.ts";
import { deptDto } from "@/type/api/sysManage/dept.ts";
import { userGroupDto } from "@/type/api/sysManage/userGroup.ts";

export class userDto extends baseClass {
  id!: string;
  username!: string;
  nickname!: string;
  password!: string;
  avatar!: string;
  sex!: string;
  email!: string;
  tel!: string;
}

export class userDto2 {
  id!: string;
  username!: string;
  nickname!: string;
}

export class userSelDto extends pageDto {
}

export class userSelAllDto {
}

export class userInsDto {
  username?: string;
  nickname?: string;
  password?: string;
  avatar?: string;
  sex?: string;
  email?: string;
  tel?: string;
}

export class userUpdDto extends userInsDto {
  id!: string;
}


export class loginDto {
  username!: string
  password!: string
}

export class registDto extends loginDto {
}

export class userUpdPsdDto {
  oldp!: string
  newp1!: string
  newp2!: string
}

export class adminResetUserPsdDto {
  id!: string
  password!: string
}

export class userDto_ extends userDto {
  roles!: roleDto[]
  depts!: deptDto[]
  ugs!: userGroupDto[]
}
