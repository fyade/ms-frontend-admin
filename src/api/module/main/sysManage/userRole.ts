import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { UserRoleDto, UserRoleUpdDto, UserRoleUpdRUDto, UserRoleUpdURDto } from "@/type/module/main/sysManage/userRole.ts";

export const userRoleApi: ApiConfig<UserRoleDto, UserRoleUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/sys-manage/user-role',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/sys-manage/user-role/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/sys-manage/user-role/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/sys-manage/user-role/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/sys-manage/user-role',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/sys-manage/user-role',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/sys-manage/user-role/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/sys-manage/user-role/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/sys-manage/user-role',
    method: 'DELETE',
    data: ids
  })
}

export function userRoleUpdUR(params: UserRoleUpdURDto) {
  return request({
    url: '/main/sys-manage/user-role/ur',
    method: 'POST',
    data: params
  })
}

export function userRoleUpdRU(params: UserRoleUpdRUDto) {
  return request({
    url: '/main/sys-manage/user-role/ru',
    method: 'POST',
    data: params
  })
}
