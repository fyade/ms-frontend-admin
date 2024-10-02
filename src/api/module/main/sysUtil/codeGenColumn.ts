import request from "@/api/request.ts";
import {
  codeGenColumnDto,
  codeGenColumnSelDto,
  codeGenColumnSelAllDto,
  codeGenColumnInsDto,
  codeGenColumnUpdDto
} from "@/type/api/main/sysUtil/codeGenColumn.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function codeGenColumnSel(params: codeGenColumnSelDto): t_funcMap_selList_ret<codeGenColumnDto> {
  return request({
    url: '/main/sys-util/code-gen-column',
    method: 'GET',
    params: params
  })
}

export function codeGenColumnSelAll(params: codeGenColumnSelAllDto): t_funcMap_selMore_ret<codeGenColumnDto> {
  return request({
    url: '/main/sys-util/code-gen-column/all',
    method: 'GET',
    params: params
  })
}

export function codeGenColumnSelById(id: number): t_funcMap_selOne_ret<codeGenColumnDto> {
  return request({
    url: `/main/sys-util/code-gen-column/${id}`,
    method: 'GET'
  })
}

export function codeGenColumnSelByIds(ids: number[]): t_funcMap_selMore_ret<codeGenColumnDto> {
  return request({
    url: `/main/sys-util/code-gen-column/ids`,
    method: 'GET',
    params: ids
  })
}

export function codeGenColumnIns(params: codeGenColumnInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-util/code-gen-column',
    method: 'POST',
    data: params
  })
}

export function codeGenColumnUpd(params: codeGenColumnUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-util/code-gen-column',
    method: 'PUT',
    data: params
  })
}

export function codeGenColumnInss(params: codeGenColumnInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-util/code-gen-column/s',
    method: 'POST',
    data: params
  })
}

export function codeGenColumnUpds(params: codeGenColumnUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-util/code-gen-column/s',
    method: 'PUT',
    data: params
  })
}

export function codeGenColumnDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-util/code-gen-column',
    method: 'DELETE',
    data: ids
  })
}

export const codeGenColumnFunc: t_funcMap<codeGenColumnDto, codeGenColumnSelDto, codeGenColumnSelAllDto, codeGenColumnInsDto, codeGenColumnUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: codeGenColumnSelDto) => {
    return codeGenColumnSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: codeGenColumnSelAllDto) => {
    return codeGenColumnSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return codeGenColumnSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return codeGenColumnSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: codeGenColumnInsDto) => {
    return codeGenColumnIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: codeGenColumnUpdDto) => {
    return codeGenColumnUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: codeGenColumnInsDto[]) => {
    return codeGenColumnInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: codeGenColumnUpdDto[]) => {
    return codeGenColumnUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return codeGenColumnDel(ids)
  }
}
