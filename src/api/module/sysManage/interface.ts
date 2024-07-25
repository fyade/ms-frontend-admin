import request from "@/api/request.ts";
import {
  interfaceDto,
  interfaceSelDto,
  interfaceSelAllDto,
  interfaceInsDto,
  interfaceUpdDto
} from "@/type/api/sysManage/interface.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function interfaceSel(params: interfaceSelDto): t_funcMap_selList_ret<interfaceDto> {
  return request({
    url: '/sys-manage/interface',
    method: 'GET',
    params: params
  })
}

export function interfaceSelAll(params: interfaceSelAllDto): t_funcMap_selMore_ret<interfaceDto> {
  return request({
    url: '/sys-manage/interface/all',
    method: 'GET',
    params: params
  })
}

export function interfaceSelById(id: number): t_funcMap_selOne_ret<interfaceDto> {
  return request({
    url: `/sys-manage/interface/${id}`,
    method: 'GET'
  })
}

export function interfaceSelByIds(ids: any[]): t_funcMap_selMore_ret<interfaceDto> {
  return request({
    url: `/sys-manage/interface/ids`,
    method: 'GET',
    params: ids
  })
}

export function interfaceIns(params: interfaceInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface',
    method: 'POST',
    data: params
  })
}

export function interfaceUpd(params: interfaceUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface',
    method: 'PUT',
    data: params
  })
}

export function interfaceInss(params: interfaceInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface/s',
    method: 'POST',
    data: params
  })
}

export function interfaceUpds(params: interfaceUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface/s',
    method: 'PUT',
    data: params
  })
}

export function interfaceDel(ids: any[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/interface',
    method: 'DELETE',
    data: ids
  })
}

export const interfaceFunc: t_funcMap<interfaceDto, interfaceSelDto, interfaceSelAllDto, interfaceInsDto, interfaceUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: interfaceSelDto) => {
    return interfaceSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: interfaceSelAllDto) => {
    return interfaceSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return interfaceSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return interfaceSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: interfaceInsDto) => {
    return interfaceIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: interfaceUpdDto) => {
    return interfaceUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: interfaceInsDto[]) => {
    return interfaceInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: interfaceUpdDto[]) => {
    return interfaceUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return interfaceDel(ids)
  }
}
