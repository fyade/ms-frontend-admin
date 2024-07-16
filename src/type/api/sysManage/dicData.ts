import { pageDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class dicDataDto extends baseInterface {
  id!: number;
  label!: string;
  value!: string;
  dicType!: string;
  ifDefault!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class dicDataSelDto extends pageDto {
}

export class dicDataSelAllDto {
}

export class dicDataInsDto {
  label!: string;
  value!: string;
  dicType!: string;
  ifDefault!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class dicDataUpdDto extends dicDataInsDto {
  id!: number;
}
