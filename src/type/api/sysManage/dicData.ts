import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class dicDataDto extends baseClass {
  id!: number;
  label!: string;
  value!: string;
  dicTypeId!: number;
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
  dicTypeId!: number;
  ifDefault!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class dicDataUpdDto extends dicDataInsDto {
  id!: number;
}
