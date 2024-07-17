import { pageDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class interfaceInterfaceGroupDto extends baseInterface {
  id!: number;
  interfaceId!: number;
  interfaceGroupId!: number;
  remark!: string;
}

export class interfaceInterfaceGroupSelDto extends pageDto {
}

export class interfaceInterfaceGroupSelAllDto {
}

export class interfaceInterfaceGroupInsDto {
  interfaceId!: number;
  interfaceGroupId!: number;
  remark!: string;
}

export class interfaceInterfaceGroupUpdDto extends interfaceInterfaceGroupInsDto {
  id!: number;
}

export class interfaceInterfaceGroupUpdIIGDto {
  interfaceId: number;
  interfaceGroupId: number[];
}

export class interfaceInterfaceGroupUpdIGIDto {
  interfaceId: number[];
  interfaceGroupId: number;
}
