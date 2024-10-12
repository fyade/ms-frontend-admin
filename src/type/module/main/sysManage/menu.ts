import { BaseClass, PageDto } from "@/type/tablePage.ts";

export const T_MENU = 'mm'
export const T_COMP = 'mc'
export const T_IS = 'ma'
export const T_Inter = 'mb'
export type T_MENU = 'mm'
export type T_COMP = 'mc'
export type T_IS = 'ma'
export type T_Inter = 'mb'
export type TType = T_MENU | T_COMP | T_IS | T_Inter

export class MenuDto<T = TType> extends BaseClass {
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

export class MenuSelDto extends PageDto {
}

export class MenuSelAllDto {
}

export class MenuInsDto<T = TType> {
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

export class MenuUpdDto<T = TType> extends MenuInsDto<T> {
  id!: number;
}
