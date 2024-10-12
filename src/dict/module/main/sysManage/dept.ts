import { publicDict } from "@/utils/base.ts";
import { DeptDto } from "@/type/module/main/sysManage/dept.ts";

export const deptDict: { [P in keyof DeptDto]: string } = {
  ...publicDict,
  label: '部门名',
  ifAdmin: '是否管理员权限',
  parentId: '父级部门',
}
