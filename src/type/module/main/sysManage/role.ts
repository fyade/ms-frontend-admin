import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class RoleDto extends BaseClass {
  id!: number;
  label!: string;
  ifAdmin!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class RoleSelDto extends PageDto {
}

export class RoleSelAllDto {
}

export class RoleInsDto {
  label!: string;
  ifAdmin!: string;
  ifDisabled!: string;
  orderNum!: number;
  remark!: string;
}

export class RoleUpdDto extends RoleInsDto {
  id!: number;
}
