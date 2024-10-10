import { publicDict } from "@/utils/base.ts";
import { RoleDto } from "@/type/module/main/sysManage/role.ts";

export const roleDict: { [P in keyof RoleDto]: string } = {
  ...publicDict,
  label: '角色名',
  ifAdmin: '是否管理员权限',
}
