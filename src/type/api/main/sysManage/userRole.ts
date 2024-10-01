import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class userRoleDto extends baseClass {
  id!: number;
  userId!: string;
  roleId!: number;
  remark!: string;
}

export class userRoleSelDto extends pageDto {
  roleId?: string
}

export class userRoleSelAllDto {
  userId?: string
  roleId?: number
}

export class userRoleInsDto {
  userId!: string;
  roleId!: number;
  remark!: string;
}

export class userRoleUpdDto extends userRoleInsDto {
  id!: number;
}


export class userRoleUpdURDto {
  userId!: string;
  roleId!: number[];
}

export class userRoleUpdRUDto {
  userId!: string[];
  roleId!: number;
}
