import { publicDict } from "@/utils/base.ts";
import { InterfaceDto } from "@/type/module/algorithm/interface.ts";

export const interfaceDict: { [P in keyof InterfaceDto]: string } = {
  ...publicDict,
  label: '接口名',
  icon: '图标',
  ifPublic: '是否公共接口',
  perms: '权限标识',
  url: '请求url',
}
