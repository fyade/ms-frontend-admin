import { publicDict } from "@/utils/base.ts";
import { InterfaceInterfaceGroupDto } from "@/type/module/algorithm/interfaceInterfaceGroup.ts";

export const interfaceInterfaceGroupDict: { [P in keyof InterfaceInterfaceGroupDto]: string } = {
  ...publicDict,
  interfaceId: '接口',
  interfaceGroupId: '接口组',
}
