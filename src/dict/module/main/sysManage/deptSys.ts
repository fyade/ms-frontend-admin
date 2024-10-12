import { publicDict } from "@/utils/base.ts";
import { DeptSysDto } from "@/type/module/main/sysManage/deptSys.ts";

export const deptSysDict: { [P in keyof DeptSysDto]: string } = {
  ...publicDict,
  deptId: '部门',
  sysId: '系统',
}
