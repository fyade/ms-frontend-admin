import request from "@/api/request.ts";
import {
  rolePermissionDto,
  rolePermissionSelDto,
  rolePermissionSelAllDto,
  rolePermissionInsDto,
  rolePermissionUpdDto
} from "@/type/api/sysManage/rolePermission.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function rolePermissionSel(params: rolePermissionSelDto): t_funcMap_selList_ret<rolePermissionDto> {
  return request({
    url: '/sys-manage/role-permission',
    method: 'GET',
    params: params
  })
}

export function rolePermissionSelAll(params: rolePermissionSelAllDto): t_funcMap_selMore_ret<rolePermissionDto> {
  return request({
    url: '/sys-manage/role-permission/all',
    method: 'GET',
    params: params
  })
}

export function rolePermissionSelById(id: number): t_funcMap_selOne_ret<rolePermissionDto> {
  return request({
    url: `/sys-manage/role-permission/${id}`,
    method: 'GET'
  })
}

export function rolePermissionSelByIds(ids: any[]): t_funcMap_selMore_ret<rolePermissionDto> {
  return request({
    url: `/sys-manage/role-permission/ids`,
    method: 'GET',
    params: ids
  })
}

export function rolePermissionIns(params: rolePermissionInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/role-permission',
    method: 'POST',
    data: params
  })
}

export function rolePermissionUpd(params: rolePermissionUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/role-permission',
    method: 'PUT',
    data: params
  })
}

export function rolePermissionInss(params: rolePermissionInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/role-permission/s',
    method: 'POST',
    data: params
  })
}

export function rolePermissionUpds(params: rolePermissionUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/role-permission/s',
    method: 'PUT',
    data: params
  })
}

export function rolePermissionDel(ids: any[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/role-permission',
    method: 'DELETE',
    data: ids
  })
}

export const rolePermissionFunc: t_funcMap = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: rolePermissionSelDto) => {
    return rolePermissionSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: rolePermissionSelAllDto) => {
    return rolePermissionSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return rolePermissionSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return rolePermissionSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: rolePermissionInsDto) => {
    return rolePermissionIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: rolePermissionUpdDto) => {
    return rolePermissionUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: rolePermissionInsDto[]) => {
    return rolePermissionInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: rolePermissionUpdDto[]) => {
    return rolePermissionUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return rolePermissionDel(ids)
  }
}
