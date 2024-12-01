import { publicDict } from "@/utils/base.ts";
import { UserVisitorDto, UserVisitorDto_ } from "@/type/module/main/otherUser/userVisitor.ts";

export const userVisitorDict: { [P in keyof UserVisitorDto_]: string } = {
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
