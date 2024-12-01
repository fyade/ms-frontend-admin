import { publicDict } from "@/utils/base.ts";
import { UserTableDefaultPermissionDto } from "@/type/module/main/otherUser/userTableDefaultPermission.ts";

export const userTableDefaultPermissionDict: { [P in keyof UserTableDefaultPermissionDto]: string } = {
  ...publicDict,
  tableName: '表名',
  permType: '权限身份类型',
  permId: '权限身份',
}
