import { pageDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export type T_MENU = 'mm'
export type T_COMP = 'mc'
export type T_Inter = 'mb'
export type tType = T_MENU | T_COMP | T_Inter

export class menuDto<T = tType> extends baseInterface {
  id!: number;
  label!: string;
  type!: T;
  path!: string;
  parentId!: number;
  component!: string;
  icon!: string;
  orderNum!: number;
  ifLink!: string;
  ifVisible!: string;
  ifDisabled!: string;
  ifPublic!: string;
  perms!: string;
  remark!: string;
}

export class menuSelDto extends pageDto {
}

export class menuSelAllDto {
}

export class menuInsDto<T = tType> {
  label!: string;
  type!: T;
  path!: string;
  parentId!: number;
  component!: string;
  icon!: string;
  orderNum!: number;
  ifLink!: string;
  ifVisible!: string;
  ifDisabled!: string;
  ifPublic!: string;
  perms!: string;
  remark!: string;
}

export class menuUpdDto extends menuInsDto {
  id!: number;
}
