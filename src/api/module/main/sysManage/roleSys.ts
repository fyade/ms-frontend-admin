import request from "@/api/request.ts";
import {
  roleSysDto,
  roleSysSelDto,
  roleSysSelAllDto,
  roleSysInsDto,
  roleSysUpdDto
} from "@/type/module/main/sysManage/roleSys.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function roleSysSel(params: roleSysSelDto): t_funcMap_selList_ret<roleSysDto> {
  return request({
    url: '/main/sys-manage/role-sys',
    method: 'GET',
    params: params
  })
}

export function roleSysSelAll(params: roleSysSelAllDto): t_funcMap_selMore_ret<roleSysDto> {
  return request({
    url: '/main/sys-manage/role-sys/all',
    method: 'GET',
    params: params
  })
}

export function roleSysSelById(id: number): t_funcMap_selOne_ret<roleSysDto> {
  return request({
    url: `/main/sys-manage/role-sys/${id}`,
    method: 'GET'
  })
}

export function roleSysSelByIds(ids: number[]): t_funcMap_selMore_ret<roleSysDto> {
  return request({
    url: `/main/sys-manage/role-sys/ids`,
    method: 'GET',
    params: ids
  })
}

export function roleSysIns(params: roleSysInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role-sys',
    method: 'POST',
    data: params
  })
}

export function roleSysUpd(params: roleSysUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role-sys',
    method: 'PUT',
    data: params
  })
}

export function roleSysInss(params: roleSysInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role-sys/s',
    method: 'POST',
    data: params
  })
}

export function roleSysUpds(params: roleSysUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role-sys/s',
    method: 'PUT',
    data: params
  })
}

export function roleSysDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/role-sys',
    method: 'DELETE',
    data: ids
  })
}

export const roleSysFunc: t_funcMap<roleSysDto, roleSysSelDto, roleSysSelAllDto, roleSysInsDto, roleSysUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: roleSysSelDto) => {
    return roleSysSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: roleSysSelAllDto) => {
    return roleSysSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return roleSysSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return roleSysSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: roleSysInsDto) => {
    return roleSysIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: roleSysUpdDto) => {
    return roleSysUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: roleSysInsDto[]) => {
    return roleSysInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: roleSysUpdDto[]) => {
    return roleSysUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return roleSysDel(ids)
  }
}
