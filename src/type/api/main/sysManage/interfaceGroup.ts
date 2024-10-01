import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class interfaceGroupDto extends baseClass {
  id!: number;
  label!: string;
  parentId!: number;
  baseURL!: string;
  orderNum!: number;
  remark!: string;
}

export class interfaceGroupSelDto extends pageDto {
}

export class interfaceGroupSelAllDto {
}

export class interfaceGroupInsDto {
  label!: string;
  parentId!: number;
  baseURL!: string;
  orderNum!: number;
  remark!: string;
}

export class interfaceGroupUpdDto extends interfaceGroupInsDto {
  id!: number;
}
