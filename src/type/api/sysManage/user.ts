import { pageDto } from "@/type/tablePage.ts";
import { baseInterface } from "@/utils/base.ts";

export class userDto extends baseInterface {
  id!: string;
  username!: string;
  nickname!: string;
  password!: string;
  avatar!: string;
  sex!: string;
  email!: string;
  tel!: string;
}

export class userDto2 {
  id!: string;
  username!: string;
  nickname!: string;
}

export class userSelDto extends pageDto {
}

export class userSelAllDto {
}

export class userInsDto {
  username!: string;
  nickname!: string;
  password!: string;
  avatar!: string;
  sex!: string;
  email!: string;
  tel!: string;
}

export class userUpdDto extends userInsDto {
  id!: string;
}


export class loginDto {
  username!: string
  password!: string
}

export class registDto extends loginDto {
}

export class resetPsdDto {
  id!: string
  password!: string
}
