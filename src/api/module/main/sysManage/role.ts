import request from "@/api/request.ts";
import {
  roleDto,
  roleSelDto,
  roleSelAllDto,
  roleInsDto,
  roleUpdDto
} from "@/type/api/main/sysManage/role.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function roleSel(params: roleSelDto): t_funcMap_selList_ret<roleDto> {
  return request({
    url: '/main/sys-manage/role',
    method: 'GET',
    params: params
  })
}

export function roleSelAll(params: roleSelAllDto): t_funcMap_selMore_ret<roleDto> {
  return request({
    url: '/main/sys-manage/role/all',
    method: 'GET',
    params: params
  })
}

export function roleSelById(id: number): t_funcMap_selOne_ret<roleDto> {
  return request({
    url: `/main/sys-manage/role/${id}`,
    method: 'GET'
  })
}

export function roleSelByIds(ids: number[]): t_funcMap_selMore_ret<roleDto> {
  return request({
    url: `/main/sys-manage/role/ids`,
    method: 'GET',
    params: ids
  })
}

export function roleIns(params: roleInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role',
    method: 'POST',
    data: params
  })
}

export function roleUpd(params: roleUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role',
    method: 'PUT',
    data: params
  })
}

export function roleInss(params: roleInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role/s',
    method: 'POST',
    data: params
  })
}

export function roleUpds(params: roleUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role/s',
    method: 'PUT',
    data: params
  })
}

export function roleDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role',
    method: 'DELETE',
    data: ids
  })
}

export const roleFunc: t_funcMap<roleDto, roleSelDto, roleSelAllDto, roleInsDto, roleUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: roleSelDto) => {
    return roleSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: roleSelAllDto) => {
    return roleSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return roleSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return roleSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: roleInsDto) => {
    return roleIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: roleUpdDto) => {
    return roleUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: roleInsDto[]) => {
    return roleInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: roleUpdDto[]) => {
    return roleUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return roleDel(ids)
  }
}
