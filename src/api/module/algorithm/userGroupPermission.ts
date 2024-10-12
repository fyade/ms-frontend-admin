import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { UserGroupPermissionDto, UserGroupPermissionUpdDto } from "@/type/module/algorithm/userGroupPermission.ts";

export const userGroupPermissionApi: ApiConfig<UserGroupPermissionDto, UserGroupPermissionUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/algorithm//user-group-permission',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/algorithm//user-group-permission/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/algorithm//user-group-permission/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/algorithm//user-group-permission/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => {
    delete obj.permissionTime
    return request({
      url: '/algorithm//user-group-permission',
      method: 'POST',
      data: obj
    })
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => {
    delete obj.permissionTime
    return request({
      url: '/algorithm//user-group-permission',
      method: 'PUT',
      data: obj
    })
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => {
    objs.forEach(obj => {
      delete obj.permissionTime
    })
    return request({
      url: '/algorithm//user-group-permission/s',
      method: 'POST',
      data: objs
    })
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => {
    objs.forEach(obj => {
      delete obj.permissionTime
    })
    return request({
      url: '/algorithm//user-group-permission/s',
      method: 'PUT',
      data: objs
    })
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/algorithm//user-group-permission',
    method: 'DELETE',
    data: ids
  })
}
