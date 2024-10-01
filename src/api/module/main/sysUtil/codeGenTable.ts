import request from "@/api/request.ts";
import {
  codeGenTableDto,
  codeGenTableSelDto,
  codeGenTableSelAllDto,
  codeGenTableInsDto,
  codeGenTableUpdDto
} from "@/type/api/main/sysUtil/codeGenTable.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function codeGenTableSel(params: codeGenTableSelDto): t_funcMap_selList_ret<codeGenTableDto> {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'GET',
    params: params
  })
}

export function codeGenTableSelAll(params: codeGenTableSelAllDto): t_funcMap_selMore_ret<codeGenTableDto> {
  return request({
    url: '/sys-util/code-gen-table/all',
    method: 'GET',
    params: params
  })
}

export function codeGenTableSelById(id: number): t_funcMap_selOne_ret<codeGenTableDto> {
  return request({
    url: `/sys-util/code-gen-table/${id}`,
    method: 'GET'
  })
}

export function codeGenTableSelByIds(ids: number[]): t_funcMap_selMore_ret<codeGenTableDto> {
  return request({
    url: `/sys-util/code-gen-table/ids`,
    method: 'GET',
    params: ids
  })
}

export function codeGenTableIns(params: codeGenTableInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'POST',
    data: params
  })
}

export function codeGenTableUpd(params: codeGenTableUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'PUT',
    data: params
  })
}

export function codeGenTableInss(params: codeGenTableInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-util/code-gen-table/s',
    method: 'POST',
    data: params
  })
}

export function codeGenTableUpds(params: codeGenTableUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-util/code-gen-table/s',
    method: 'PUT',
    data: params
  })
}

export function codeGenTableDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-util/code-gen-table',
    method: 'DELETE',
    data: ids
  })
}

export const codeGenTableFunc: t_funcMap<codeGenTableDto, codeGenTableSelDto, codeGenTableSelAllDto, codeGenTableInsDto, codeGenTableUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: codeGenTableSelDto) => {
    return codeGenTableSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: codeGenTableSelAllDto) => {
    return codeGenTableSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return codeGenTableSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return codeGenTableSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: codeGenTableInsDto) => {
    return codeGenTableIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: codeGenTableUpdDto) => {
    return codeGenTableUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: codeGenTableInsDto[]) => {
    return codeGenTableInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: codeGenTableUpdDto[]) => {
    return codeGenTableUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return codeGenTableDel(ids)
  }
}
