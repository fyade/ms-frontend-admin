import { publicDict } from "@/utils/base.ts";
import { DicTypeDto } from "@/type/module/main/sysManage/dicType.ts";

export const dicTypeDict: { [P in keyof DicTypeDto]: string } = {
  ...publicDict,
  name: '字典名',
  type: '字典类型',
}
