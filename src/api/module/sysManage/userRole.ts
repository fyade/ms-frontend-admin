import request from "@/api/request.ts";
import {
  userRoleDto,
  userRoleSelDto,
  userRoleSelAllDto,
  userRoleInsDto,
  userRoleUpdDto, userRoleUpdURDto, userRoleUpdRUDto
} from "@/type/api/sysManage/userRole.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function userRoleSel(params: userRoleSelDto): t_funcMap_selList_ret<userRoleDto> {
  return request({
    url: '/sys-manage/user-role',
    method: 'GET',
    params: params
  })
}

export function userRoleSelAll(params: userRoleSelAllDto): t_funcMap_selMore_ret<userRoleDto> {
  return request({
    url: '/sys-manage/user-role/all',
    method: 'GET',
    params: params
  })
}

export function userRoleSelById(id: number): t_funcMap_selOne_ret<userRoleDto> {
  return request({
    url: `/sys-manage/user-role/${id}`,
    method: 'GET'
  })
}

export function userRoleSelByIds(ids: any[]): t_funcMap_selMore_ret<userRoleDto> {
  return request({
    url: `/sys-manage/user-role/ids`,
    method: 'GET',
    params: ids
  })
}

export function userRoleIns(params: userRoleInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-role',
    method: 'POST',
    data: params
  })
}

export function userRoleUpd(params: userRoleUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-role',
    method: 'PUT',
    data: params
  })
}

export function userRoleInss(params: userRoleInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-role/s',
    method: 'POST',
    data: params
  })
}

export function userRoleUpds(params: userRoleUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-role/s',
    method: 'PUT',
    data: params
  })
}

export function userRoleDel(ids: any[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-role',
    method: 'DELETE',
    data: ids
  })
}

export function userRoleUpdUR(params: userRoleUpdURDto) {
  return request({
    url: '/sys-manage/user-role/ur',
    method: 'POST',
    data: params
  })
}

export function userRoleUpdRU(params: userRoleUpdRUDto) {
  return request({
    url: '/sys-manage/user-role/ru',
    method: 'POST',
    data: params
  })
}

export const userRoleFunc: t_funcMap<userRoleDto, userRoleSelDto, userRoleSelAllDto, userRoleInsDto, userRoleUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: userRoleSelDto) => {
    return userRoleSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: userRoleSelAllDto) => {
    return userRoleSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return userRoleSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return userRoleSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: userRoleInsDto) => {
    return userRoleIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: userRoleUpdDto) => {
    return userRoleUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: userRoleInsDto[]) => {
    return userRoleInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: userRoleUpdDto[]) => {
    return userRoleUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return userRoleDel(ids)
  }
}
