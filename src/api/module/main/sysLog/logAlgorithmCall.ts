import request from "@/api/request.ts";
import {
  logAlgorithmCallDto,
  logAlgorithmCallSelDto,
  logAlgorithmCallSelAllDto,
  logAlgorithmCallInsDto,
  logAlgorithmCallUpdDto
} from "@/type/api/main/sysLog/logAlgorithmCall.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function logAlgorithmCallSel(params: logAlgorithmCallSelDto): t_funcMap_selList_ret<logAlgorithmCallDto> {
  return request({
    url: '/main/sys-log/log-algorithm-call',
    method: 'GET',
    params: params
  })
}

export function logAlgorithmCallSelAll(params: logAlgorithmCallSelAllDto): t_funcMap_selMore_ret<logAlgorithmCallDto> {
  return request({
    url: '/main/sys-log/log-algorithm-call/all',
    method: 'GET',
    params: params
  })
}

export function logAlgorithmCallSelById(id: number): t_funcMap_selOne_ret<logAlgorithmCallDto> {
  return request({
    url: `/main/sys-log/log-algorithm-call/${id}`,
    method: 'GET'
  })
}

export function logAlgorithmCallSelByIds(ids: number[]): t_funcMap_selMore_ret<logAlgorithmCallDto> {
  return request({
    url: `/main/sys-log/log-algorithm-call/ids`,
    method: 'GET',
    params: ids
  })
}

export function logAlgorithmCallIns(params: logAlgorithmCallInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-algorithm-call',
    method: 'POST',
    data: params
  })
}

export function logAlgorithmCallUpd(params: logAlgorithmCallUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-algorithm-call',
    method: 'PUT',
    data: params
  })
}

export function logAlgorithmCallInss(params: logAlgorithmCallInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-algorithm-call/s',
    method: 'POST',
    data: params
  })
}

export function logAlgorithmCallUpds(params: logAlgorithmCallUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-algorithm-call/s',
    method: 'PUT',
    data: params
  })
}

export function logAlgorithmCallDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-log/log-algorithm-call',
    method: 'DELETE',
    data: ids
  })
}

export const logAlgorithmCallFunc: t_funcMap<logAlgorithmCallDto, logAlgorithmCallSelDto, logAlgorithmCallSelAllDto, logAlgorithmCallInsDto, logAlgorithmCallUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: logAlgorithmCallSelDto) => {
    return logAlgorithmCallSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: logAlgorithmCallSelAllDto) => {
    return logAlgorithmCallSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return logAlgorithmCallSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return logAlgorithmCallSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: logAlgorithmCallInsDto) => {
    return logAlgorithmCallIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: logAlgorithmCallUpdDto) => {
    return logAlgorithmCallUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: logAlgorithmCallInsDto[]) => {
    return logAlgorithmCallInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: logAlgorithmCallUpdDto[]) => {
    return logAlgorithmCallUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return logAlgorithmCallDel(ids)
  }
}
