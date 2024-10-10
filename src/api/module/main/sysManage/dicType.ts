import request from "@/api/request.ts";
import {
  dicTypeDto,
  dicTypeSelDto,
  dicTypeSelAllDto,
  dicTypeInsDto,
  dicTypeUpdDto
} from "@/type/module/main/sysManage/dicType.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function dicTypeSel(params: dicTypeSelDto): t_funcMap_selList_ret<dicTypeDto> {
  return request({
    url: '/main/sys-manage/dic-type',
    method: 'GET',
    params: params
  })
}

export function dicTypeSelAll(params: dicTypeSelAllDto): t_funcMap_selMore_ret<dicTypeDto> {
  return request({
    url: '/main/sys-manage/dic-type/all',
    method: 'GET',
    params: params
  })
}

export function dicTypeSelById(id: number): t_funcMap_selOne_ret<dicTypeDto> {
  return request({
    url: `/main/sys-manage/dic-type/${id}`,
    method: 'GET'
  })
}

export function dicTypeSelByIds(ids: number[]): t_funcMap_selMore_ret<dicTypeDto> {
  return request({
    url: `/main/sys-manage/dic-type/ids`,
    method: 'GET',
    params: ids
  })
}

export function dicTypeIns(params: dicTypeInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dic-type',
    method: 'POST',
    data: params
  })
}

export function dicTypeUpd(params: dicTypeUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dic-type',
    method: 'PUT',
    data: params
  })
}

export function dicTypeInss(params: dicTypeInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dic-type/s',
    method: 'POST',
    data: params
  })
}

export function dicTypeUpds(params: dicTypeUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dic-type/s',
    method: 'PUT',
    data: params
  })
}

export function dicTypeDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dic-type',
    method: 'DELETE',
    data: ids
  })
}

export const dicTypeFunc: t_funcMap<dicTypeDto, dicTypeSelDto, dicTypeSelAllDto, dicTypeInsDto, dicTypeUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: dicTypeSelDto) => {
    return dicTypeSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: dicTypeSelAllDto) => {
    return dicTypeSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return dicTypeSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return dicTypeSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: dicTypeInsDto) => {
    return dicTypeIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: dicTypeUpdDto) => {
    return dicTypeUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: dicTypeInsDto[]) => {
    return dicTypeInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: dicTypeUpdDto[]) => {
    return dicTypeUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return dicTypeDel(ids)
  }
}
