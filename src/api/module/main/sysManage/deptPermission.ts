import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { DeptPermissionDto, DeptPermissionUpdDPDto, DeptPermissionUpdDto } from "@/type/module/main/sysManage/deptPermission.ts";

export const deptPermissionApi: ApiConfig<DeptPermissionDto, DeptPermissionUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/sys-manage/dept-permission',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/sys-manage/dept-permission/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/sys-manage/dept-permission/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/sys-manage/dept-permission/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/sys-manage/dept-permission',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/sys-manage/dept-permission',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/sys-manage/dept-permission/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/sys-manage/dept-permission/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/sys-manage/dept-permission',
    method: 'DELETE',
    data: ids
  })
}

export function deptPermissionUpdDP(data: DeptPermissionUpdDPDto) {
  return request({
    url: `/main/sys-manage/dept-permission/dp`,
    method: 'POST',
    data: data
  })
}
