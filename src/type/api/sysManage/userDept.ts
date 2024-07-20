import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class userDeptDto extends baseClass {
  id!: number;
  userId!: string;
  deptId!: number;
  remark!: string;
}

export class userDeptSelDto extends pageDto {
  deptId!: number;
}

export class userDeptSelAllDto {
}

export class userDeptInsDto {
  userId!: string;
  deptId!: number;
  remark!: string;
}

export class userDeptUpdDto {
  id!: number;
  userId!: string;
  deptId!: number;
  remark!: string;
}

export class userDeptUpdUDDto {
  userId!: string
  deptId!: string[]
}

export class userDeptUpdDUDto {
  userId!: string[]
  deptId!: string
}
