import request from "@/api/request.ts";
import {
  userGroupDto,
  userGroupSelDto,
  userGroupSelAllDto,
  userGroupInsDto,
  userGroupUpdDto
} from "@/type/api/sysManage/userGroup.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function userGroupSel(params: userGroupSelDto): t_funcMap_selList_ret<userGroupDto> {
  return request({
    url: '/sys-manage/user-group',
    method: 'GET',
    params: params
  })
}

export function userGroupSelAll(params: userGroupSelAllDto): t_funcMap_selMore_ret<userGroupDto> {
  return request({
    url: '/sys-manage/user-group/all',
    method: 'GET',
    params: params
  })
}

export function userGroupSelById(id: number): t_funcMap_selOne_ret<userGroupDto> {
  return request({
    url: `/sys-manage/user-group/${id}`,
    method: 'GET'
  })
}

export function userGroupSelByIds(ids: number[]): t_funcMap_selMore_ret<userGroupDto> {
  return request({
    url: `/sys-manage/user-group/ids`,
    method: 'GET',
    params: ids
  })
}

export function userGroupIns(params: userGroupInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-group',
    method: 'POST',
    data: params
  })
}

export function userGroupUpd(params: userGroupUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-group',
    method: 'PUT',
    data: params
  })
}

export function userGroupInss(params: userGroupInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-group/s',
    method: 'POST',
    data: params
  })
}

export function userGroupUpds(params: userGroupUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-group/s',
    method: 'PUT',
    data: params
  })
}

export function userGroupDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user-group',
    method: 'DELETE',
    data: ids
  })
}

export const userGroupFunc: t_funcMap<userGroupDto, userGroupSelDto, userGroupSelAllDto, userGroupInsDto, userGroupUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: userGroupSelDto) => {
    return userGroupSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: userGroupSelAllDto) => {
    return userGroupSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return userGroupSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return userGroupSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: userGroupInsDto) => {
    return userGroupIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: userGroupUpdDto) => {
    return userGroupUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: userGroupInsDto[]) => {
    return userGroupInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: userGroupUpdDto[]) => {
    return userGroupUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return userGroupDel(ids)
  }
}
