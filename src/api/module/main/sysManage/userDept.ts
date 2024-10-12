import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { UserDeptDto, UserDeptUpdDto, UserDeptUpdDUDto, UserDeptUpdUDDto } from "@/type/module/main/sysManage/userDept.ts";

export const userDeptApi: ApiConfig<UserDeptDto, UserDeptUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/sys-manage/user-dept',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/sys-manage/user-dept/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/sys-manage/user-dept/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/sys-manage/user-dept/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/sys-manage/user-dept',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/sys-manage/user-dept',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/sys-manage/user-dept/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/sys-manage/user-dept/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/sys-manage/user-dept',
    method: 'DELETE',
    data: ids
  })
}

export function userDeptUpdUD(params: UserDeptUpdUDDto) {
  return request({
    url: `/main/sys-manage/user-dept/ud`,
    method: 'POST',
    data: params
  })
}

export function userDeptUpdDU(params: UserDeptUpdDUDto) {
  return request({
    url: `/main/sys-manage/user-dept/du`,
    method: 'POST',
    data: params
  })
}
