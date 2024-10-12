import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class DicDataDto extends BaseClass {
  id!: number;
  label!: string;
  value!: string;
  dicTypeId!: number;
  ifDefault!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class DicDataSelDto extends PageDto {
}

export class DicDataSelAllDto {
}

export class DicDataInsDto {
  label!: string;
  value!: string;
  dicTypeId!: number;
  ifDefault!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class DicDataUpdDto extends DicDataInsDto {
  id!: number;
}
