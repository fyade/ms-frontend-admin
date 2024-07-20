import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class dicTypeDto extends baseClass {
  id!: number;
  name!: string;
  type!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class dicTypeSelDto extends pageDto {
}

export class dicTypeSelAllDto {
}

export class dicTypeInsDto {
  name!: string;
  type!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class dicTypeUpdDto extends dicTypeInsDto {
  id!: number;
}
