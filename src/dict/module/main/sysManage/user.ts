import { publicDict } from "@/utils/base.ts";
import { UserDto } from "@/type/module/main/sysManage/user.ts";

export const userDict: { [P in keyof UserDto]: string } & { roles: string, depts: string, ugs: string } = {
  ...publicDict,
  username: '用户名',
  nickname: '昵称',
  password: '密码',
  avatar: '头像',
  sex: '性别',
  email: '邮箱',
  tel: '电话',
  roles: '角色',
  depts: '部门',
  ugs: '用户组',
}
