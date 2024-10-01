import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export const T_MENU = 'mm'
export const T_COMP = 'mc'
export const T_IS = 'ma'
export const T_Inter = 'mb'
export type T_MENU = 'mm'
export type T_COMP = 'mc'
export type T_IS = 'ma'
export type T_Inter = 'mb'
export type tType = T_MENU | T_COMP | T_IS | T_Inter

export class menuDto<T = tType> extends baseClass {
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
  sysId!: number;
  remark!: string;
}

export class menuSelDto extends pageDto {
}

export class menuSelAllDto<T = tType> {
  type?: T;
  parentId?: number;
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
  sysId!: number;
  remark!: string;
}

export class menuUpdDto extends menuInsDto {
  id!: number;
}
