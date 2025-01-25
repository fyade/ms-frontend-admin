import { BaseClass, PageDto } from "@/type/tablePage.ts";
import { TMenuType } from "@/utils/base.ts";

export class MenuDto<T = TMenuType> extends BaseClass {
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
  ifFixed!: string;
  perms!: string;
  sysId!: number;
  remark!: string;
}

export class MenuSelDto extends PageDto {
}

export class MenuSelAllDto {
}

export class MenuInsDto<T = TMenuType> {
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
  ifFixed!: string;
  perms!: string;
  sysId!: number;
  remark!: string;
}

export class MenuUpdDto<T = TMenuType> extends MenuInsDto<T> {
  id!: number;
}
