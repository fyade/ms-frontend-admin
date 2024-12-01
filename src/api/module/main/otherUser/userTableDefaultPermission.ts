import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { UserTableDefaultPermissionDto, UserTableDefaultPermissionUpdDto } from "@/type/module/main/otherUser/userTableDefaultPermission.ts";

export const userTableDefaultPermissionApi: ApiConfig<UserTableDefaultPermissionDto, UserTableDefaultPermissionUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/other-user/user-table-default-permission',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/other-user/user-table-default-permission/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/other-user/user-table-default-permission/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/other-user/user-table-default-permission/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/other-user/user-table-default-permission',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/other-user/user-table-default-permission',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/other-user/user-table-default-permission/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/other-user/user-table-default-permission/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/other-user/user-table-default-permission',
    method: 'DELETE',
    data: ids
  })
}
