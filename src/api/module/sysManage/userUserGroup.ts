import request from "@/api/request.ts";
import {
  userUserGroupDto,
  userUserGroupSelDto,
  userUserGroupSelAllDto,
  userUserGroupInsDto,
  userUserGroupUpdDto, userUserGroupUpdUUGDtp, userUserGroupUpdUGUDtp
} from "@/type/api/sysManage/userUserGroup.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function userUserGroupSel(params: userUserGroupSelDto): t_funcMap_selList_ret<userUserGroupDto> {
  return request({
    url: '/sys-manage/user-user-group',
    method: 'GET',
    params: params
  })
}

export function userUserGroupSelAll(params: userUserGroupSelAllDto): t_funcMap_selMore_ret<userUserGroupDto> {
  return request({
    url: '/sys-manage/user-user-group/all',
    method: 'GET',
    params: params
  })
}

export function userUserGroupSelById(id: number): t_funcMap_selOne_ret<userUserGroupDto> {
  return request({
    url: `/sys-manage/user-user-group/${id}`,
    method: 'GET'
  })
}

export function userUserGroupSelByIds(ids: number[]): t_funcMap_selMore_ret<userUserGroupDto> {
  return request({
    url: `/sys-manage/user-user-group/ids`,
    method: 'GET',
    params: ids
  })
}

export function userUserGroupIns(params: userUserGroupInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-user-group',
    method: 'POST',
    data: params
  })
}

export function userUserGroupUpd(params: userUserGroupUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-user-group',
    method: 'PUT',
    data: params
  })
}

export function userUserGroupInss(params: userUserGroupInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-user-group/s',
    method: 'POST',
    data: params
  })
}

export function userUserGroupUpds(params: userUserGroupUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-user-group/s',
    method: 'PUT',
    data: params
  })
}

export function userUserGroupDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-user-group',
    method: 'DELETE',
    data: ids
  })
}

export function userUserGroupUpdUUG(param: userUserGroupUpdUUGDtp) {
  return request({
    url: `/sys-manage/user-user-group/uug`,
    method: 'POST',
    data: param
  })
}

export function userUserGroupUpdUGU(param: userUserGroupUpdUGUDtp) {
  return request({
    url: `/sys-manage/user-user-group/ugu`,
    method: 'POST',
    data: param
  })
}

export const userUserGroupFunc: t_funcMap<userUserGroupDto, userUserGroupSelDto, userUserGroupSelAllDto, userUserGroupInsDto, userUserGroupUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: userUserGroupSelDto) => {
    return userUserGroupSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: userUserGroupSelAllDto) => {
    return userUserGroupSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return userUserGroupSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return userUserGroupSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: userUserGroupInsDto) => {
    return userUserGroupIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: userUserGroupUpdDto) => {
    return userUserGroupUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: userUserGroupInsDto[]) => {
    return userUserGroupInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: userUserGroupUpdDto[]) => {
    return userUserGroupUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return userUserGroupDel(ids)
  }
}
