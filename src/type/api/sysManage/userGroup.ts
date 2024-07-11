import { pageSelDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class userGroupDto extends baseInterface {
  id!: number;
  label!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class userGroupSelDto extends pageSelDto {
}

export class userGroupSelAllDto {
}

export class userGroupInsDto {
  label!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}

export class userGroupUpdDto {
  id!: number;
  label!: string;
  parentId!: number;
  orderNum!: number;
  remark!: string;
}
