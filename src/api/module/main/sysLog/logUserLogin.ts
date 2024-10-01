import request from "@/api/request.ts";
import {
  logUserLoginDto,
  logUserLoginSelDto,
  logUserLoginSelAllDto,
  logUserLoginInsDto,
  logUserLoginUpdDto
} from "@/type/api/main/sysLog/logUserLogin.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function logUserLoginSel(params: logUserLoginSelDto): t_funcMap_selList_ret<logUserLoginDto> {
  return request({
    url: '/sys-log/log-user-login',
    method: 'GET',
    params: params
  })
}

export function logUserLoginSelAll(params: logUserLoginSelAllDto): t_funcMap_selMore_ret<logUserLoginDto> {
  return request({
    url: '/sys-log/log-user-login/all',
    method: 'GET',
    params: params
  })
}

export function logUserLoginSelById(id: number): t_funcMap_selOne_ret<logUserLoginDto> {
  return request({
    url: `/sys-log/log-user-login/${id}`,
    method: 'GET'
  })
}

export function logUserLoginSelByIds(ids: number[]): t_funcMap_selMore_ret<logUserLoginDto> {
  return request({
    url: `/sys-log/log-user-login/ids`,
    method: 'GET',
    params: ids
  })
}

export function logUserLoginIns(params: logUserLoginInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-log/log-user-login',
    method: 'POST',
    data: params
  })
}

export function logUserLoginUpd(params: logUserLoginUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-log/log-user-login',
    method: 'PUT',
    data: params
  })
}

export function logUserLoginInss(params: logUserLoginInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-log/log-user-login/s',
    method: 'POST',
    data: params
  })
}

export function logUserLoginUpds(params: logUserLoginUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-log/log-user-login/s',
    method: 'PUT',
    data: params
  })
}

export function logUserLoginDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-log/log-user-login',
    method: 'DELETE',
    data: ids
  })
}

export const logUserLoginFunc: t_funcMap<logUserLoginDto, logUserLoginSelDto, logUserLoginSelAllDto, logUserLoginInsDto, logUserLoginUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: logUserLoginSelDto) => {
    return logUserLoginSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: logUserLoginSelAllDto) => {
    return logUserLoginSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return logUserLoginSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return logUserLoginSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: logUserLoginInsDto) => {
    return logUserLoginIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: logUserLoginUpdDto) => {
    return logUserLoginUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: logUserLoginInsDto[]) => {
    return logUserLoginInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: logUserLoginUpdDto[]) => {
    return logUserLoginUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return logUserLoginDel(ids)
  }
}
