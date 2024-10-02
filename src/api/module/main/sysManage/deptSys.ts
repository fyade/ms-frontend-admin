import request from "@/api/request.ts";
import {
  deptSysDto,
  deptSysSelDto,
  deptSysSelAllDto,
  deptSysInsDto,
  deptSysUpdDto
} from "@/type/api/main/sysManage/deptSys.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function deptSysSel(params: deptSysSelDto): t_funcMap_selList_ret<deptSysDto> {
  return request({
    url: '/main/sys-manage/dept-sys',
    method: 'GET',
    params: params
  })
}

export function deptSysSelAll(params: deptSysSelAllDto): t_funcMap_selMore_ret<deptSysDto> {
  return request({
    url: '/main/sys-manage/dept-sys/all',
    method: 'GET',
    params: params
  })
}

export function deptSysSelById(id: number): t_funcMap_selOne_ret<deptSysDto> {
  return request({
    url: `/main/sys-manage/dept-sys/${id}`,
    method: 'GET'
  })
}

export function deptSysSelByIds(ids: number[]): t_funcMap_selMore_ret<deptSysDto> {
  return request({
    url: `/main/sys-manage/dept-sys/ids`,
    method: 'GET',
    params: ids
  })
}

export function deptSysIns(params: deptSysInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dept-sys',
    method: 'POST',
    data: params
  })
}

export function deptSysUpd(params: deptSysUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dept-sys',
    method: 'PUT',
    data: params
  })
}

export function deptSysInss(params: deptSysInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dept-sys/s',
    method: 'POST',
    data: params
  })
}

export function deptSysUpds(params: deptSysUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dept-sys/s',
    method: 'PUT',
    data: params
  })
}

export function deptSysDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/dept-sys',
    method: 'DELETE',
    data: ids
  })
}

export const deptSysFunc: t_funcMap<deptSysDto, deptSysSelDto, deptSysSelAllDto, deptSysInsDto, deptSysUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: deptSysSelDto) => {
    return deptSysSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: deptSysSelAllDto) => {
    return deptSysSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return deptSysSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return deptSysSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: deptSysInsDto) => {
    return deptSysIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: deptSysUpdDto) => {
    return deptSysUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: deptSysInsDto[]) => {
    return deptSysInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: deptSysUpdDto[]) => {
    return deptSysUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return deptSysDel(ids)
  }
}
