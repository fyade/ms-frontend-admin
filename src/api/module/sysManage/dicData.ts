import request from "@/api/request.ts";
import {
  dicDataDto,
  dicDataSelDto,
  dicDataSelAllDto,
  dicDataInsDto,
  dicDataUpdDto
} from "@/type/api/sysManage/dicData.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function dicDataSel(params: dicDataSelDto): t_funcMap_selList_ret<dicDataDto> {
  return request({
    url: '/sys-manage/dic-data',
    method: 'GET',
    params: params
  })
}

export function dicDataSelAll(params: dicDataSelAllDto): t_funcMap_selMore_ret<dicDataDto> {
  return request({
    url: '/sys-manage/dic-data/all',
    method: 'GET',
    params: params
  })
}

export function dicDataSelById(id: number): t_funcMap_selOne_ret<dicDataDto> {
  return request({
    url: `/sys-manage/dic-data/${id}`,
    method: 'GET'
  })
}

export function dicDataSelByIds(ids: any[]): t_funcMap_selMore_ret<dicDataDto> {
  return request({
    url: `/sys-manage/dic-data/ids`,
    method: 'GET',
    params: ids
  })
}

export function dicDataIns(params: dicDataInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dic-data',
    method: 'POST',
    data: params
  })
}

export function dicDataUpd(params: dicDataUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dic-data',
    method: 'PUT',
    data: params
  })
}

export function dicDataInss(params: dicDataInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dic-data/s',
    method: 'POST',
    data: params
  })
}

export function dicDataUpds(params: dicDataUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dic-data/s',
    method: 'PUT',
    data: params
  })
}

export function dicDataDel(ids: any[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dic-data',
    method: 'DELETE',
    data: ids
  })
}

export const dicDataFunc: t_funcMap = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: dicDataSelDto) => {
    return dicDataSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: dicDataSelAllDto) => {
    return dicDataSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return dicDataSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return dicDataSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: dicDataInsDto) => {
    return dicDataIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: dicDataUpdDto) => {
    return dicDataUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: dicDataInsDto[]) => {
    return dicDataInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: dicDataUpdDto[]) => {
    return dicDataUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return dicDataDel(ids)
  }
}
