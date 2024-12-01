import { publicDict } from "@/utils/base.ts";
import { UserRoleDto } from "@/type/module/main/sysManage/userRole.ts";

export const userRoleDict: { [P in keyof UserRoleDto]: string } = {
  ...publicDict,
  userId: '用户',
  roleId: '角色',
  loginRole: '登录身份',
}
