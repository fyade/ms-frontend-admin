import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class TableRowPermissionDto extends BaseClass {
  id!: number;
  permissionId!: number;
  actionType!: string;
  actionId!: string;
  dataType!: string;
}

export class TableRowPermissionSelDto extends PageDto {
}

export class TableRowPermissionSelAllDto {
}

export class TableRowPermissionInsDto {
  permissionId!: number;
  actionType!: string;
  actionId!: string;
  dataType!: string;
}

export class TableRowPermissionUpdDto extends TableRowPermissionInsDto {
  id!: number;
}
