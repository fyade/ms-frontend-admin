import { publicDict } from "@/utils/base.ts";
import { LogUserLoginDto } from "@/type/module/main/sysLog/logUserLogin.ts";

export const logUserLoginDict: { [P in keyof LogUserLoginDto]: string } = {
  ...publicDict,
  userId: '用户id',
  loginIp: '登录ip',
  loginPosition: '登录地',
  loginBrowser: '登录浏览器',
  loginOs: '登录系统',
  ifSuccess: '是否成功',
}
