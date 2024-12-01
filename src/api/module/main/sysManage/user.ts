import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import {
  UserDto,
  UserUpdDto,
  LoginDto,
  UserUpdPsdDto,
  AdminResetUserPsdDto,
  RegistDto
} from "@/type/module/main/sysManage/user.ts";
import { encrypt } from "@/utils/EncryptUtils.ts";

export const userApi: ApiConfig<UserDto, UserUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/sys-manage/user',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/sys-manage/user/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/sys-manage/user/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/sys-manage/user/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/sys-manage/user',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/sys-manage/user',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/sys-manage/user/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/sys-manage/user/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/sys-manage/user',
    method: 'DELETE',
    data: ids
  })
}

export function loginApi(data: LoginDto) {
  return request({
    url: '/sys/user/adminlogin',
    method: 'POST',
    data: {
      ...data,
      password: encrypt(data.password),
      psdType: 'b'
    }
  })
}

export function logOutApi() {
  return request({
    url: '/sys/user/log-out',
    method: 'POST',
  })
}

export function getSelfInfo() {
  return request({
    url: '/main/sys-manage/user/self-info',
    method: 'GET',
  })
}

export function newUser(params: RegistDto) {
  return request({
    url: '/main/sys-manage/user/admin-new',
    method: 'POST',
    data: {
      ...params,
      password: encrypt(params.password),
      psdType: 'b'
    }
  })
}

export function updUser(params: UserUpdDto) {
  return request({
    url: '/main/sys-manage/user/upd-user',
    method: 'POST',
    data: params
  })
}

export function updPsd(params: UserUpdPsdDto) {
  return request({
    url: '/main/sys-manage/user/upd-psd',
    method: 'POST',
    data: {
      oldp: encrypt(params.oldp),
      newp1: encrypt(params.newp1),
      newp2: encrypt(params.newp2),
      oldpType: 'b',
      newp1Type: 'b',
      newp2Type: 'b'
    }
  })
}

export function resetUserPsd(params: AdminResetUserPsdDto) {
  return request({
    url: '/main/sys-manage/user/admin-reset-user-psd',
    method: 'POST',
    data: {
      ...params,
      password: encrypt(params.password),
      psdType: 'b'
    }
  })
}
