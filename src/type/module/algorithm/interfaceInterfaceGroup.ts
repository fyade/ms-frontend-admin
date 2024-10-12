import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class InterfaceInterfaceGroupDto extends BaseClass {
  id!: number;
  interfaceId!: number;
  interfaceGroupId!: number;
  remark!: string;
}

export class InterfaceInterfaceGroupSelDto extends PageDto {
}

export class InterfaceInterfaceGroupSelAllDto {
}

export class InterfaceInterfaceGroupInsDto {
  interfaceId!: number;
  interfaceGroupId!: number;
  remark!: string;
}

export class InterfaceInterfaceGroupUpdDto extends InterfaceInterfaceGroupInsDto {
  id!: number;
}

export class InterfaceInterfaceGroupUpdIIGDto {
  interfaceId!: number;
  interfaceGroupId!: number[];
}

export class InterfaceInterfaceGroupUpdIGIDto {
  interfaceId!: number[];
  interfaceGroupId!: number;
}
