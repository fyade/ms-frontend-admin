import { publicDict } from "@/utils/base.ts";
import { LogOperationDto } from "@/type/module/main/sysLog/logOperation.ts";

export const logOperationDict: { [P in keyof LogOperationDto]: string } = {
  ...publicDict,
  reqId: '请求id',
  callIp: '请求ip',
  perms: '权限标识',
  userId: '用户id',
  reqParam: '请求参数',
  oldValue: '旧值',
  operateType: '操作类型',
  ifSuccess: '是否成功',
}
