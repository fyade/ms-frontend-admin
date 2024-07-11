import { pageSelDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class userDeptDto extends baseInterface {
  id!: number;
  userId!: string;
  deptId!: number;
  remark!: string;
}

export class userDeptSelDto extends pageSelDto {
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
