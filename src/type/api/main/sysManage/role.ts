import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class roleDto extends baseClass {
  id!: number;
  label!: string;
  ifAdmin!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class roleSelDto extends pageDto {
}

export class roleSelAllDto {
}

export class roleInsDto {
  label!: string;
  ifAdmin!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class roleUpdDto extends roleInsDto {
  id!: number;
}
