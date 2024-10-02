import request from "@/api/request.ts";
import {
  logOperationDto,
  logOperationSelDto,
  logOperationSelAllDto,
  logOperationInsDto,
  logOperationUpdDto
} from "@/type/api/main/sysLog/logOperation.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function logOperationSel(params: logOperationSelDto): t_funcMap_selList_ret<logOperationDto> {
  return request({
    url: '/main/sys-log/log-operation',
    method: 'GET',
    params: params
  })
}

export function logOperationSelAll(params: logOperationSelAllDto): t_funcMap_selMore_ret<logOperationDto> {
  return request({
    url: '/main/sys-log/log-operation/all',
    method: 'GET',
    params: params
  })
}

export function logOperationSelById(id: number): t_funcMap_selOne_ret<logOperationDto> {
  return request({
    url: `/main/sys-log/log-operation/${id}`,
    method: 'GET'
  })
}

export function logOperationSelByIds(ids: number[]): t_funcMap_selMore_ret<logOperationDto> {
  return request({
    url: `/main/sys-log/log-operation/ids`,
    method: 'GET',
    params: ids
  })
}

export function logOperationIns(params: logOperationInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-operation',
    method: 'POST',
    data: params
  })
}

export function logOperationUpd(params: logOperationUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-operation',
    method: 'PUT',
    data: params
  })
}

export function logOperationInss(params: logOperationInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-operation/s',
    method: 'POST',
    data: params
  })
}

export function logOperationUpds(params: logOperationUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-operation/s',
    method: 'PUT',
    data: params
  })
}

export function logOperationDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-operation',
    method: 'DELETE',
    data: ids
  })
}

export const logOperationFunc: t_funcMap<logOperationDto, logOperationSelDto, logOperationSelAllDto, logOperationInsDto, logOperationUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: logOperationSelDto) => {
    return logOperationSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: logOperationSelAllDto) => {
    return logOperationSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return logOperationSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return logOperationSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: logOperationInsDto) => {
    return logOperationIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: logOperationUpdDto) => {
    return logOperationUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: logOperationInsDto[]) => {
    return logOperationInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: logOperationUpdDto[]) => {
    return logOperationUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return logOperationDel(ids)
  }
}
