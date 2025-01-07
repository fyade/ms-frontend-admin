import { publicDict } from "@/utils/base.ts";
import { LogAlgorithmCallDto } from "@/type/module/algorithm/logAlgorithmCall.ts";

export const logAlgorithmCallDict: { [P in keyof LogAlgorithmCallDto]: string } = {
  ...publicDict,
  userGroupPermissionId: '用户组权限id',
  pperms: '接口组权限标识',
  perms: '接口权限标识',
  userId: '用户id',
  callIp: '请求源ip',
  ifSuccess: '是否成功',
  loginRole: '登录身份',
}
