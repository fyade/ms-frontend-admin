import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import {
  AdminResetUserVisitorPsdDto,
  UserVisitorDto,
  UserVisitorRegistDto,
  UserVisitorUpdDto
} from "@/type/module/main/otherUser/userVisitor.ts";
import { encrypt } from "@/utils/EncryptUtils.ts";

export const userVisitorApi: ApiConfig<UserVisitorDto, UserVisitorUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/other-user/user-visitor',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/other-user/user-visitor/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/other-user/user-visitor/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/other-user/user-visitor/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/other-user/user-visitor',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/other-user/user-visitor',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/other-user/user-visitor/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/other-user/user-visitor/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/other-user/user-visitor',
    method: 'DELETE',
    data: ids
  })
}

export function newUserVisitor(params: UserVisitorRegistDto) {
  return request({
    url: '/main/other-user/user-visitor/admin-new',
    method: 'POST',
    data: {
      ...params,
      password: encrypt(params.password),
      psdType: 'b'
    }
  })
}

export function resetUserVisitorPsd(params: AdminResetUserVisitorPsdDto) {
  return request({
    url: '/main/other-user/user-visitor/admin-reset-user-psd',
    method: 'POST',
    data: {
      ...params,
      password: encrypt(params.password),
      psdType: 'b'
    }
  })
}
