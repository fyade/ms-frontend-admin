import { publicDict } from "@/utils/base.ts";
import { MenuDto } from "@/type/module/main/sysManage/menu.ts";

export const menuDict: { [P in keyof MenuDto]: string } = {
  ...publicDict,
  label: '菜单/组件名',
  type: '菜单类型',
  path: '菜单路径',
  parentId: '父级菜单',
  component: '组件路径',
  icon: '图标',
  ifLink: '是否外链',
  ifVisible: '是否显示',
  ifPublic: '是否公共接口',
  perms: '权限标识',
  sysId: '所属系统',
}

export const menuDictInter: { [P in keyof MenuDto]: string } = {
  ...menuDict,
  label: '接口组名',
}

export const menuDictI2: { [P in keyof MenuDto]: string } = {
  ...menuDict,
  label: '接口名',
}
