import { publicDict } from "@/utils/base.ts";
import { RoleSysDto } from "@/type/module/main/sysManage/roleSys.ts";

export const roleSysDict: { [P in keyof RoleSysDto]: string } = {
  ...publicDict,
  roleId: '角色',
  sysId: '系统',
}
