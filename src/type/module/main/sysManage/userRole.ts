import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class UserRoleDto extends BaseClass {
  id!: number;
  userId!: string;
  roleId!: number;
  remark!: string;
}

export class UserRoleSelDto extends PageDto {
}

export class UserRoleSelAllDto {
}

export class UserRoleInsDto {
  userId!: string;
  roleId!: number;
  remark!: string;
}

export class UserRoleUpdDto extends UserRoleInsDto {
  id!: number;
}

export class UserRoleUpdURDto {
  userId!: string;
  roleId!: number[];
}

export class UserRoleUpdRUDto {
  userId!: string[];
  roleId!: number;
}
