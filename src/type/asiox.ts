export class AxiosRes<T> {
  code!: number;
  data!: T;
  msg!: string;
  time!: Date;
  timestamp!: number;
  reqId!: string;
}
