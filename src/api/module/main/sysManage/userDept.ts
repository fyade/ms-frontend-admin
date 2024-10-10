import request from "@/api/request.ts";
import {
  userDeptDto,
  userDeptSelDto,
  userDeptSelAllDto,
  userDeptInsDto,
  userDeptUpdDto, userDeptUpdUDDto, userDeptUpdDUDto
} from "@/type/module/main/sysManage/userDept.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function userDeptSel(params: userDeptSelDto): t_funcMap_selList_ret<userDeptDto> {
  return request({
    url: '/main/sys-manage/user-dept',
    method: 'GET',
    params: params
  })
}

export function userDeptSelAll(params: userDeptSelAllDto): t_funcMap_selMore_ret<userDeptDto> {
  return request({
    url: '/main/sys-manage/user-dept/all',
    method: 'GET',
    params: params
  })
}

export function userDeptSelById(id: number): t_funcMap_selOne_ret<userDeptDto> {
  return request({
    url: `/main/sys-manage/user-dept/${id}`,
    method: 'GET'
  })
}

export function userDeptSelByIds(ids: number[]): t_funcMap_selMore_ret<userDeptDto> {
  return request({
    url: `/main/sys-manage/user-dept/ids`,
    method: 'GET',
    params: ids
  })
}

export function userDeptIns(params: userDeptInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/user-dept',
    method: 'POST',
    data: params
  })
}

export function userDeptUpd(params: userDeptUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/user-dept',
    method: 'PUT',
    data: params
  })
}

export function userDeptInss(params: userDeptInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/user-dept/s',
    method: 'POST',
    data: params
  })
}

export function userDeptUpds(params: userDeptUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/user-dept/s',
    method: 'PUT',
    data: params
  })
}

export function userDeptDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/user-dept',
    method: 'DELETE',
    data: ids
  })
}

export function userDeptUpdUD(params: userDeptUpdUDDto) {
  return request({
    url: `/main/sys-manage/user-dept/ud`,
    method: 'POST',
    data: params
  })
}

export function userDeptUpdDU(params: userDeptUpdDUDto) {
  return request({
    url: `/main/sys-manage/user-dept/du`,
    method: 'POST',
    data: params
  })
}

export const userDeptFunc: t_funcMap<userDeptDto, userDeptSelDto, userDeptSelAllDto, userDeptInsDto, userDeptUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: userDeptSelDto) => {
    return userDeptSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: userDeptSelAllDto) => {
    return userDeptSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return userDeptSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return userDeptSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: userDeptInsDto) => {
    return userDeptIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: userDeptUpdDto) => {
    return userDeptUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: userDeptInsDto[]) => {
    return userDeptInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: userDeptUpdDto[]) => {
    return userDeptUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return userDeptDel(ids)
  }
}
