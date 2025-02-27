import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class ScheduledTaskDto extends BaseClass {
  id!: number;
  name!: string;
  target!: string;
  cronExpression!: string;
  orderNum!: number;
  ifDisabled!: string;
  remark!: string;
}

export class ScheduledTaskSelDto extends PageDto {
}

export class ScheduledTaskSelAllDto {
}

export class ScheduledTaskInsDto {
  name!: string;
  target!: string;
  cronExpression!: string;
  orderNum!: number;
  ifDisabled!: string;
  remark!: string;
}

export class ScheduledTaskUpdDto extends ScheduledTaskInsDto {
  id!: number;
}
