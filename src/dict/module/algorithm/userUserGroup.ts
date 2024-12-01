import { publicDict } from "@/utils/base.ts";
import { UserUserGroupDto } from "@/type/module/algorithm/userUserGroup.ts";

export const userUserGroupDict: { [P in keyof UserUserGroupDto]: string } = {
  ...publicDict,
  userId: '用户',
  userGroupId: '用户组',
  loginRole: '登录身份',
}
