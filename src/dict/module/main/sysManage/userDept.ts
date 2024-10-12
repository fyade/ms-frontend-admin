import { publicDict } from "@/utils/base.ts";
import { UserDeptDto } from "@/type/module/main/sysManage/userDept.ts";

export const userDeptDict: { [P in keyof UserDeptDto]: string } = {
  ...publicDict,
  userId: '用户',
  deptId: '部门',
}
