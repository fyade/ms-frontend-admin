import request from "@/api/request.ts";
import {
  sysDto,
  sysSelDto,
  sysSelAllDto,
  sysInsDto,
  sysUpdDto, SysDto, SysUpdDto
} from "@/type/module/main/sysManage/sys.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret, ApiConfig
} from "@/type/tablePage.ts";

export function sysSel(params: sysSelDto): t_funcMap_selList_ret<sysDto> {
  return request({
    url: '/main/sys-manage/sys',
    method: 'GET',
    params: params
  })
}

export function sysSelAll(params: sysSelAllDto): t_funcMap_selMore_ret<sysDto> {
  return request({
    url: '/main/sys-manage/sys/all',
    method: 'GET',
    params: params
  })
}

export function sysSelById(id: number): t_funcMap_selOne_ret<sysDto> {
  return request({
    url: `/main/sys-manage/sys/${id}`,
    method: 'GET'
  })
}

export function sysSelByIds(ids: number[]): t_funcMap_selMore_ret<sysDto> {
  return request({
    url: `/main/sys-manage/sys/ids`,
    method: 'GET',
    params: ids
  })
}

export function sysIns(params: sysInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/sys',
    method: 'POST',
    data: params
  })
}

export function sysUpd(params: sysUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/sys',
    method: 'PUT',
    data: params
  })
}

export function sysInss(params: sysInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/sys/s',
    method: 'POST',
    data: params
  })
}

export function sysUpds(params: sysUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/sys/s',
    method: 'PUT',
    data: params
  })
}

export function sysDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/sys',
    method: 'DELETE',
    data: ids
  })
}

export const sysFunc: t_funcMap<sysDto, sysSelDto, sysSelAllDto, sysInsDto, sysUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: sysSelDto) => {
    return sysSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: sysSelAllDto) => {
    return sysSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return sysSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return sysSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: sysInsDto) => {
    return sysIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: sysUpdDto) => {
    return sysUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: sysInsDto[]) => {
    return sysInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: sysUpdDto[]) => {
    return sysUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return sysDel(ids)
  }
}

export const sysApi: ApiConfig<SysDto, SysUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/sys-manage/sys',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/sys-manage/sys/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/sys-manage/sys/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/sys-manage/sys/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/sys-manage/sys',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/sys-manage/sys',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/sys-manage/sys/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/sys-manage/sys/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/sys-manage/sys',
    method: 'DELETE',
    data: ids
  })
}
