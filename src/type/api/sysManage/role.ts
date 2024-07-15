import { pageSelDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class roleDto extends baseInterface {
  id!: number;
  label!: string;
  ifAdmin!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class roleSelDto extends pageSelDto {
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
