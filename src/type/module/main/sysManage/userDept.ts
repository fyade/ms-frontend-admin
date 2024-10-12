import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class UserDeptDto extends BaseClass {
  id!: number;
  userId!: string;
  deptId!: number;
  remark!: string;
}

export class UserDeptSelDto extends PageDto {
}

export class UserDeptSelAllDto {
}

export class UserDeptInsDto {
  userId!: string;
  deptId!: number;
  remark!: string;
}

export class UserDeptUpdDto extends UserDeptInsDto {
  id!: number;
}

export class UserDeptUpdUDDto {
  userId!: string
  deptId!: number[]
}

export class UserDeptUpdDUDto {
  userId!: string[]
  deptId!: number
}
