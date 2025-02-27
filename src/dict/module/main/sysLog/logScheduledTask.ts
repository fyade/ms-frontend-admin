import { publicDict } from "@/utils/base.ts";
import { LogScheduledTaskDto } from "@/type/module/main/sysLog/logScheduledTask.ts";

export const logScheduledTaskDict: { [P in keyof LogScheduledTaskDto]: string } = {
  ...publicDict,
  taskTarget: '任务目标标识',
  operateType: '执行类型',
  ifSuccess: '是否成功',
}
