import { pageSelDto } from "@/type/tablePage.ts";

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

export class dicTypeUpdDto {
  id!: number;
  name!: string;
  type!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}
