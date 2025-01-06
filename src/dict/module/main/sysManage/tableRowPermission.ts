import { publicDict } from "@/utils/base.ts";
import { TableRowPermissionDto } from "@/type/module/main/sysManage/tableRowPermission.ts";

export const tableRowPermissionDict: { [P in keyof TableRowPermissionDto]: string } = {
  ...publicDict,
  permissionId: '权限id',
  actionType: '作用类型',
  actionId: '作用id',
  dataType: '数据类型',
}
