import { publicDict } from "@/utils/base.ts";
import { DicDataDto } from "@/type/module/main/sysManage/dicData.ts";

export const dicDataDict: { [P in keyof DicDataDto]: string } = {
  ...publicDict,
  label: '标签',
  value: '值',
  dicTypeId: '字典类型',
}
