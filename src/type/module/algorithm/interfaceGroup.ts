import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class InterfaceGroupDto extends BaseClass {
  id!: number;
  label!: string;
  parentId!: number;
  perms!: string;
  baseURL!: string;
  orderNum!: number;
  remark!: string;
}

export class InterfaceGroupSelDto extends PageDto {
}

export class InterfaceGroupSelAllDto {
}

export class InterfaceGroupInsDto {
  label!: string;
  parentId!: number;
  perms!: string;
  baseURL!: string;
  orderNum!: number;
  remark!: string;
}

export class InterfaceGroupUpdDto extends InterfaceGroupInsDto {
  id!: number;
}
