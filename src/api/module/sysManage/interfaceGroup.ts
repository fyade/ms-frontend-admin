import request from "@/api/request.ts";
import {
  interfaceGroupDto,
  interfaceGroupSelDto,
  interfaceGroupSelAllDto,
  interfaceGroupInsDto,
  interfaceGroupUpdDto
} from "@/type/api/sysManage/interfaceGroup.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function interfaceGroupSel(params: interfaceGroupSelDto): t_funcMap_selList_ret<interfaceGroupDto> {
  return request({
    url: '/sys-manage/interface-group',
    method: 'GET',
    params: params
  })
}

export function interfaceGroupSelAll(params: interfaceGroupSelAllDto): t_funcMap_selMore_ret<interfaceGroupDto> {
  return request({
    url: '/sys-manage/interface-group/all',
    method: 'GET',
    params: params
  })
}

export function interfaceGroupSelById(id: number): t_funcMap_selOne_ret<interfaceGroupDto> {
  return request({
    url: `/sys-manage/interface-group/${id}`,
    method: 'GET'
  })
}

export function interfaceGroupSelByIds(ids: number[]): t_funcMap_selMore_ret<interfaceGroupDto> {
  return request({
    url: `/sys-manage/interface-group/ids`,
    method: 'GET',
    params: ids
  })
}

export function interfaceGroupIns(params: interfaceGroupInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface-group',
    method: 'POST',
    data: params
  })
}

export function interfaceGroupUpd(params: interfaceGroupUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface-group',
    method: 'PUT',
    data: params
  })
}

export function interfaceGroupInss(params: interfaceGroupInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface-group/s',
    method: 'POST',
    data: params
  })
}

export function interfaceGroupUpds(params: interfaceGroupUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface-group/s',
    method: 'PUT',
    data: params
  })
}

export function interfaceGroupDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface-group',
    method: 'DELETE',
    data: ids
  })
}

export const interfaceGroupFunc: t_funcMap<interfaceGroupDto, interfaceGroupSelDto, interfaceGroupSelAllDto, interfaceGroupInsDto, interfaceGroupUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: interfaceGroupSelDto) => {
    return interfaceGroupSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: interfaceGroupSelAllDto) => {
    return interfaceGroupSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return interfaceGroupSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return interfaceGroupSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: interfaceGroupInsDto) => {
    return interfaceGroupIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: interfaceGroupUpdDto) => {
    return interfaceGroupUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: interfaceGroupInsDto[]) => {
    return interfaceGroupInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: interfaceGroupUpdDto[]) => {
    return interfaceGroupUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return interfaceGroupDel(ids)
  }
}
