import { publicDict } from "@/utils/base.ts";
import { UserGroupDto } from "@/type/module/algorithm/userGroup.ts";

export const userGroupDict: { [P in keyof UserGroupDto]: string } = {
  ...publicDict,
  label: '用户组名',
  parentId: '父级用户组',
}
