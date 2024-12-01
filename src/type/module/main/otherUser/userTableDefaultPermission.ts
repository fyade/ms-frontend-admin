import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class UserTableDefaultPermissionDto extends BaseClass {
  id!: number;
  tableName!: string;
  permType!: string;
  permId!: number;
}

export class UserTableDefaultPermissionSelDto extends PageDto {
}

export class UserTableDefaultPermissionSelAllDto {
}

export class UserTableDefaultPermissionInsDto {
  tableName!: string;
  permType!: string;
  permId!: number;
}

export class UserTableDefaultPermissionUpdDto extends UserTableDefaultPermissionInsDto {
  id!: number;
}
