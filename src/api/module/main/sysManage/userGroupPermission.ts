import request from "@/api/request.ts";
import {
  userGroupPermissionDto,
  userGroupPermissionSelDto,
  userGroupPermissionSelAllDto,
  userGroupPermissionInsDto,
  userGroupPermissionUpdDto
} from "@/type/api/main/sysManage/userGroupPermission.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function userGroupPermissionSel(params: userGroupPermissionSelDto): t_funcMap_selList_ret<userGroupPermissionDto> {
  return request({
    url: '/main/sys-manage/user-group-permission',
    method: 'GET',
    params: params
  })
}

export function userGroupPermissionSelAll(params: userGroupPermissionSelAllDto): t_funcMap_selMore_ret<userGroupPermissionDto> {
  return request({
    url: '/main/sys-manage/user-group-permission/all',
    method: 'GET',
    params: params
  })
}

export function userGroupPermissionSelById(id: number): t_funcMap_selOne_ret<userGroupPermissionDto> {
  return request({
    url: `/main/sys-manage/user-group-permission/${id}`,
    method: 'GET'
  })
}

export function userGroupPermissionSelByIds(ids: number[]): t_funcMap_selMore_ret<userGroupPermissionDto> {
  return request({
    url: `/main/sys-manage/user-group-permission/ids`,
    method: 'GET',
    params: ids
  })
}

export function userGroupPermissionIns(params: userGroupPermissionInsDto): t_funcMap_iud_ret {
  delete params.permissionTime
  return request({
    url: '/main/sys-manage/user-group-permission',
    method: 'POST',
    data: params
  })
}

export function userGroupPermissionUpd(params: userGroupPermissionUpdDto): t_funcMap_iud_ret {
  delete params.permissionTime
  return request({
    url: '/main/sys-manage/user-group-permission',
    method: 'PUT',
    data: params
  })
}

export function userGroupPermissionInss(params: userGroupPermissionInsDto[]): t_funcMap_iud_ret {
  params.forEach(param => {
    delete param.permissionTime
  })
  return request({
    url: '/main/sys-manage/user-group-permission/s',
    method: 'POST',
    data: params
  })
}

export function userGroupPermissionUpds(params: userGroupPermissionUpdDto[]): t_funcMap_iud_ret {
  params.forEach(param => {
    delete param.permissionTime
  })
  return request({
    url: '/main/sys-manage/user-group-permission/s',
    method: 'PUT',
    data: params
  })
}

export function userGroupPermissionDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/user-group-permission',
    method: 'DELETE',
    data: ids
  })
}

export const userGroupPermissionFunc: t_funcMap<userGroupPermissionDto, userGroupPermissionSelDto, userGroupPermissionSelAllDto, userGroupPermissionInsDto, userGroupPermissionUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: userGroupPermissionSelDto) => {
    return userGroupPermissionSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: userGroupPermissionSelAllDto) => {
    return userGroupPermissionSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return userGroupPermissionSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return userGroupPermissionSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: userGroupPermissionInsDto) => {
    return userGroupPermissionIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: userGroupPermissionUpdDto) => {
    return userGroupPermissionUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: userGroupPermissionInsDto[]) => {
    return userGroupPermissionInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: userGroupPermissionUpdDto[]) => {
    return userGroupPermissionUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return userGroupPermissionDel(ids)
  }
}
