import { publicDict } from "@/utils/base.ts";
import { SysDto } from "@/type/module/main/sysManage/sys.ts";

export const sysDict: { [P in keyof SysDto]: string } = {
  ...publicDict,
  name: '系统名',
  perms: '权限字符',
  path: 'url路径',
}
