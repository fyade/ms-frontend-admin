import request from "@/api/request.ts";
import {
  interfaceInterfaceGroupDto,
  interfaceInterfaceGroupSelDto,
  interfaceInterfaceGroupSelAllDto,
  interfaceInterfaceGroupInsDto,
  interfaceInterfaceGroupUpdDto, interfaceInterfaceGroupUpdIIGDto, interfaceInterfaceGroupUpdIGIDto
} from "@/type/module/algorithm/interfaceInterfaceGroup.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function interfaceInterfaceGroupSel(params: interfaceInterfaceGroupSelDto): t_funcMap_selList_ret<interfaceInterfaceGroupDto> {
  return request({
    url: '/algorithm/interface-interface-group',
    method: 'GET',
    params: params
  })
}

export function interfaceInterfaceGroupSelAll(params: interfaceInterfaceGroupSelAllDto): t_funcMap_selMore_ret<interfaceInterfaceGroupDto> {
  return request({
    url: '/algorithm/interface-interface-group/all',
    method: 'GET',
    params: params
  })
}

export function interfaceInterfaceGroupSelById(id: number): t_funcMap_selOne_ret<interfaceInterfaceGroupDto> {
  return request({
    url: `/algorithm/interface-interface-group/${id}`,
    method: 'GET'
  })
}

export function interfaceInterfaceGroupSelByIds(ids: number[]): t_funcMap_selMore_ret<interfaceInterfaceGroupDto> {
  return request({
    url: `/algorithm/interface-interface-group/ids`,
    method: 'GET',
    params: ids
  })
}

export function interfaceInterfaceGroupIns(params: interfaceInterfaceGroupInsDto): t_funcMap_iud_ret {
  return request({
    url: '/algorithm/interface-interface-group',
    method: 'POST',
    data: params
  })
}

export function interfaceInterfaceGroupUpd(params: interfaceInterfaceGroupUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/algorithm/interface-interface-group',
    method: 'PUT',
    data: params
  })
}

export function interfaceInterfaceGroupInss(params: interfaceInterfaceGroupInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/algorithm/interface-interface-group/s',
    method: 'POST',
    data: params
  })
}

export function interfaceInterfaceGroupUpds(params: interfaceInterfaceGroupUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/algorithm/interface-interface-group/s',
    method: 'PUT',
    data: params
  })
}

export function interfaceInterfaceGroupDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/algorithm/interface-interface-group',
    method: 'DELETE',
    data: ids
  })
}

export function interfaceInterfaceGroupUpdIIG(params: interfaceInterfaceGroupUpdIIGDto) {
  return request({
    url: '/algorithm/interface-interface-group/iig',
    method: 'POST',
    data: params
  })
}

export function interfaceInterfaceGroupUpdIGI(params: interfaceInterfaceGroupUpdIGIDto) {
  return request({
    url: '/algorithm/interface-interface-group/igi',
    method: 'POST',
    data: params
  })
}

export const interfaceInterfaceGroupFunc: t_funcMap<interfaceInterfaceGroupDto, interfaceInterfaceGroupSelDto, interfaceInterfaceGroupSelAllDto, interfaceInterfaceGroupInsDto, interfaceInterfaceGroupUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: interfaceInterfaceGroupSelDto) => {
    return interfaceInterfaceGroupSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: interfaceInterfaceGroupSelAllDto) => {
    return interfaceInterfaceGroupSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return interfaceInterfaceGroupSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return interfaceInterfaceGroupSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: interfaceInterfaceGroupInsDto) => {
    return interfaceInterfaceGroupIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: interfaceInterfaceGroupUpdDto) => {
    return interfaceInterfaceGroupUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: interfaceInterfaceGroupInsDto[]) => {
    return interfaceInterfaceGroupInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: interfaceInterfaceGroupUpdDto[]) => {
    return interfaceInterfaceGroupUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return interfaceInterfaceGroupDel(ids)
  }
}
