import { publicDict } from "@/utils/base.ts";
import { DeptPermissionDto } from "@/type/module/main/sysManage/deptPermission.ts";

export const deptPermissionDict: { [P in keyof DeptPermissionDto]: string } = {
  ...publicDict,
  deptId: '部门',
  permissionId: '权限',
}
