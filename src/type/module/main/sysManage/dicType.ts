import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class DicTypeDto extends BaseClass {
  id!: number;
  name!: string;
  type!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class DicTypeSelDto extends PageDto {
}

export class DicTypeSelAllDto {
}

export class DicTypeInsDto {
  name!: string;
  type!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class DicTypeUpdDto extends DicTypeInsDto {
  id!: number;
}
