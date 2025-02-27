import { publicDict } from "@/utils/base.ts";
import { ScheduledTaskDto } from "@/type/module/main/sysMonitor/scheduledTask.ts";

export const scheduledTaskDict: { [P in keyof ScheduledTaskDto]: string } = {
  ...publicDict,
  name: '任务名',
  target: '任务目标标识',
  cronExpression: 'cron表达式',
}
