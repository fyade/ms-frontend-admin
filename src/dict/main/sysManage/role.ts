import { publicDict } from "@/utils/base.ts";
import { roleDto } from "@/type/api/main/sysManage/role.ts";

export const roleDict: { [P in keyof roleDto]: string } = {
  ...publicDict,
  label: '角色名',
  ifAdmin: '是否管理员权限',
}
