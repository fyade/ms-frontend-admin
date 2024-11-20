import { publicDict } from "@/utils/base.ts";
import { MenuIpWhiteListDto } from "@/type/module/main/sysManage/menuIpWhiteList.ts";

export const menuIpWhiteListDict: { [P in keyof MenuIpWhiteListDto]: string } = {
  ...publicDict,
  menuId: '菜单',
  whiteList: '白名单',
  fromType: '来源类型',
  type: '白名单类型',
}
