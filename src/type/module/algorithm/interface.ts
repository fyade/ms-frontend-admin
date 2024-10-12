import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class InterfaceDto extends BaseClass {
  id!: number;
  label!: string;
  icon!: string;
  orderNum!: number;
  ifDisabled!: string;
  ifPublic!: string;
  perms!: string;
  url!: string;
  remark!: string;
}

export class InterfaceSelDto extends PageDto {
}

export class InterfaceSelAllDto {
}

export class InterfaceInsDto {
  label!: string;
  icon!: string;
  orderNum!: number;
  ifDisabled!: string;
  ifPublic!: string;
  perms!: string;
  url!: string;
  remark!: string;
}

export class InterfaceUpdDto extends InterfaceInsDto {
  id!: number;
}
