import { publicDict } from "@/utils/base.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";

export const sysDict: { [P in keyof SysDto]: string } = {
  ...publicDict,
  name: '系统名',
  perms: '权限标识',
  path: 'url路径',
}
