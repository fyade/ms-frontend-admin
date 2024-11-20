import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class MenuIpWhiteListDto extends BaseClass {
  id!: number;
  menuId!: number;
  whiteList!: string;
  fromType!: string;
  type!: string;
  remark!: string;
}

export class MenuIpWhiteListSelDto extends PageDto {
}

export class MenuIpWhiteListSelAllDto {
}

export class MenuIpWhiteListInsDto {
  menuId!: number;
  whiteList!: string;
  fromType!: string;
  type!: string;
  remark!: string;
}

export class MenuIpWhiteListUpdDto extends MenuIpWhiteListInsDto {
  id!: number;
}
