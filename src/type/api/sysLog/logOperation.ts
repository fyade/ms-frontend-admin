import { pageDto } from "@/type/tablePage.ts";
import { baseClass } from "@/utils/base.ts";

export class logOperationDto extends baseClass {
  id!: number;
  perms!: string;
  userId!: string;
  reqParam!: string;
  oldValue!: string;
  operateType!: string;
  ifSuccess!: string;
  remark!: string;
}

export class logOperationSelDto extends pageDto {
}

export class logOperationSelAllDto {
}

export class logOperationInsDto {
  perms!: string;
  userId!: string;
  reqParam!: string;
  oldValue!: string;
  operateType!: string;
  ifSuccess!: string;
  remark!: string;
}

export class logOperationUpdDto extends logOperationInsDto {
  id!: number;
}
