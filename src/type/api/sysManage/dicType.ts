import { pageSelDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class dicTypeDto extends baseInterface {
  id!: number;
  name!: string;
  type!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class dicTypeSelDto extends pageSelDto {
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
