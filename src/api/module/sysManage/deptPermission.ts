import request from "@/api/request.ts";
import {
  deptPermissionDto,
  deptPermissionSelDto,
  deptPermissionSelAllDto,
  deptPermissionInsDto,
  deptPermissionUpdDto, updManyDPDto
} from "@/type/api/sysManage/deptPermission.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function deptPermissionSel(params: deptPermissionSelDto): t_funcMap_selList_ret<deptPermissionDto> {
  return request({
    url: '/sys-manage/dept-permission',
    method: 'GET',
    params: params
  })
}

export function deptPermissionSelAll(params: deptPermissionSelAllDto): t_funcMap_selMore_ret<deptPermissionDto> {
  return request({
    url: '/sys-manage/dept-permission/all',
    method: 'GET',
    params: params
  })
}

export function deptPermissionSelById(id: number): t_funcMap_selOne_ret<deptPermissionDto> {
  return request({
    url: `/sys-manage/dept-permission/${id}`,
    method: 'GET'
  })
}

export function deptPermissionSelByIds(ids: any[]): t_funcMap_selMore_ret<deptPermissionDto> {
  return request({
    url: `/sys-manage/dept-permission/ids`,
    method: 'GET',
    params: ids
  })
}

export function deptPermissionIns(params: deptPermissionInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept-permission',
    method: 'POST',
    data: params
  })
}

export function deptPermissionUpd(params: deptPermissionUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept-permission',
    method: 'PUT',
    data: params
  })
}

export function deptPermissionInss(params: deptPermissionInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept-permission/s',
    method: 'POST',
    data: params
  })
}

export function deptPermissionUpds(params: deptPermissionUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept-permission/s',
    method: 'PUT',
    data: params
  })
}

export function deptPermissionDel(ids: any[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/dept-permission',
    method: 'DELETE',
    data: ids
  })
}

export function deptPermissionUpdDP(data: updManyDPDto) {
  return request({
    url: `/sys-manage/dept-permission/dp`,
    method: 'POST',
    data: data
  })
}

export const deptPermissionFunc: t_funcMap = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: deptPermissionSelDto) => {
    return deptPermissionSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: deptPermissionSelAllDto) => {
    return deptPermissionSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return deptPermissionSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return deptPermissionSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: deptPermissionInsDto) => {
    return deptPermissionIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: deptPermissionUpdDto) => {
    return deptPermissionUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: deptPermissionInsDto[]) => {
    return deptPermissionInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: deptPermissionUpdDto[]) => {
    return deptPermissionUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return deptPermissionDel(ids)
  }
}
