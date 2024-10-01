import request from "@/api/request.ts";
import {
  deptDto,
  deptSelDto,
  deptSelAllDto,
  deptInsDto,
  deptUpdDto
} from "@/type/api/main/sysManage/dept.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function deptSel(params: deptSelDto): t_funcMap_selList_ret<deptDto> {
  return request({
    url: '/sys-manage/dept',
    method: 'GET',
    params: params
  })
}

export function deptSelAll(params: deptSelAllDto): t_funcMap_selMore_ret<deptDto> {
  return request({
    url: '/sys-manage/dept/all',
    method: 'GET',
    params: params
  })
}

export function deptSelById(id: number): t_funcMap_selOne_ret<deptDto> {
  return request({
    url: `/sys-manage/dept/${id}`,
    method: 'GET'
  })
}

export function deptSelByIds(ids: number[]): t_funcMap_selMore_ret<deptDto> {
  return request({
    url: `/sys-manage/dept/ids`,
    method: 'GET',
    params: ids
  })
}

export function deptIns(params: deptInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept',
    method: 'POST',
    data: params
  })
}

export function deptUpd(params: deptUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept',
    method: 'PUT',
    data: params
  })
}

export function deptInss(params: deptInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept/s',
    method: 'POST',
    data: params
  })
}

export function deptUpds(params: deptUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept/s',
    method: 'PUT',
    data: params
  })
}

export function deptDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept',
    method: 'DELETE',
    data: ids
  })
}

export const deptFunc: t_funcMap<deptDto, deptSelDto, deptSelAllDto, deptInsDto, deptUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: deptSelDto) => {
    return deptSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: deptSelAllDto) => {
    return deptSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return deptSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return deptSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: deptInsDto) => {
    return deptIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: deptUpdDto) => {
    return deptUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: deptInsDto[]) => {
    return deptInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: deptUpdDto[]) => {
    return deptUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return deptDel(ids)
  }
}
