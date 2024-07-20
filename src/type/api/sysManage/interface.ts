import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class interfaceDto extends baseClass {
  id!: number;
  label!: string;
  icon!: string;
  orderNum!: number;
  ifDisabled!: string;
  ifPublic!: string;
  perms!: string;
  remark!: string;
}

export class interfaceSelDto extends pageDto {
}

export class interfaceSelAllDto {
}

export class interfaceInsDto {
  label!: string;
  orderNum!: number;
  ifDisabled!: string;
  ifPublic!: string;
  perms!: string;
  remark!: string;
}

export class interfaceUpdDto extends interfaceInsDto {
  id!: number;
}
