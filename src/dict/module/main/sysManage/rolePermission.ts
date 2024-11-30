import { publicDict } from "@/utils/base.ts";
import { RolePermissionDto } from "@/type/module/main/sysManage/rolePermission.ts";

export const rolePermissionDict: { [P in keyof RolePermissionDto]: string } = {
  ...publicDict,
  roleId: '角色',
  permissionId: '权限',
}
