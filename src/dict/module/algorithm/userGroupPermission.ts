import { publicDict } from "@/utils/base.ts";
import { UserGroupPermissionDto } from "@/type/module/algorithm/userGroupPermission.ts";

export const userGroupPermissionDict: { [P in keyof UserGroupPermissionDto]: string } = {
  ...publicDict,
  userGroupId: '用户组',
  permissionId: '接口组',
  ifLongTerm: '是否长期权限',
  ifLimitRequestTimes: '是否限制次数',
  ifRejectRequestUseUp: '次数用尽后是否拒绝请求',
  permissionStartTime: '权限开始时间',
  permissionEndTime: '权限结束时间',
  permissionTime: '权限期限',
  limitRequestTimes: '请求限制次数',
  ifUseUp: '是否已用尽',
}
