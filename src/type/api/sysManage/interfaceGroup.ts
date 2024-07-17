import { pageDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class interfaceGroupDto extends baseInterface {
  id!: number;
  label!: string;
  parentId!: number;
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
  orderNum!: number;
  remark!: string;
}

export class interfaceGroupUpdDto extends interfaceGroupInsDto {
  id!: number;
}
