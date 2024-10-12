import { publicDict } from "@/utils/base.ts";
import { InterfaceGroupDto } from "@/type/module/algorithm/interfaceGroup.ts";

export const interfaceGroupDict: { [P in keyof InterfaceGroupDto]: string } = {
  ...publicDict,
  label: '接口组名',
  parentId: '父级接口组',
  baseURL: 'baseURL',
}
