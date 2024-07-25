import request from "@/api/request.ts";
import {
  userDto,
  userSelDto,
  userSelAllDto,
  userInsDto,
  userUpdDto, registDto, loginDto
} from "@/type/api/sysManage/user.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";
import { encrypt } from "@/utils/EncryptUtils.ts";

export function userSel(params: userSelDto): t_funcMap_selList_ret<userDto> {
  return request({
    url: '/sys-manage/user',
    method: 'GET',
    params: params
  })
}

export function userSelAll(params: userSelAllDto): t_funcMap_selMore_ret<userDto> {
  return request({
    url: '/sys-manage/user/all',
    method: 'GET',
    params: params
  })
}

export function userSelById(id: number): t_funcMap_selOne_ret<userDto> {
  return request({
    url: `/sys-manage/user/${id}`,
    method: 'GET'
  })
}

export function userSelByIds(ids: any[]): t_funcMap_selMore_ret<userDto> {
  return request({
    url: `/sys-manage/user/ids`,
    method: 'GET',
    params: ids
  })
}

export function userIns(params: userInsDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user',
    method: 'POST',
    data: params
  })
}

export function userUpd(params: userUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user',
    method: 'PUT',
    data: params
  })
}

export function userInss(params: userInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user/s',
    method: 'POST',
    data: params
  })
}

export function userUpds(params: userUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user/s',
    method: 'PUT',
    data: params
  })
}

export function userDel(ids: any[]): t_funcMap_iud_ret {
  return request({
    url: '/sys-manage/user',
    method: 'DELETE',
    data: ids
  })
}

export function registApi(data: registDto) {
  return request({
    url: '/sys/user/regist',
    method: 'POST',
    data: data
  })
}

export function loginApi(data: loginDto) {
  return request({
    url: '/sys/user/adminlogin',
    method: 'POST',
    data: {
      ...data,
      password: encrypt(data.password)
    }
  })
}

export function getSelfInfo() {
  return request({
    url: '/sys-manage/user/self-info',
    method: 'GET',
  })
}

export function userSelList(params: any) {
  return request({
    url: '/sys-manage/user/page',
    method: 'GET',
    params: params
  })
}

export function newUser(params: any) {
  return request({
    url: '/sys-manage/user',
    method: 'POST',
    data: {
      ...params,
      password: encrypt(params.password)
    }
  })
}

export function updUser(params: any) {
  return request({
    url: '/sys-manage/user/upd-user',
    method: 'POST',
    data: params
  })
}

export function updPsd(params: any) {
  return request({
    url: '/sys-manage/user/upd-psd',
    method: 'POST',
    data: {
      oldp: encrypt(params.oldp),
      newp1: encrypt(params.newp1),
      newp2: encrypt(params.newp2)
    }
  })
}

export function resetUserPsd(params: any) {
  return request({
    url: '/sys-manage/user/admin-reset-user-psd',
    method: 'POST',
    data: {
      ...params,
      password: encrypt(params.password)
    }
  })
}

export const userFunc: t_funcMap<userDto, userSelDto, userSelAllDto, userInsDto, userUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: userSelDto) => {
    return userSelList(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: userSelAllDto) => {
    return userSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return userSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return userSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: userInsDto) => {
    return newUser(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: userUpdDto) => {
    return userUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: userInsDto[]) => {
    return userInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: userUpdDto[]) => {
    return userUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return userDel(ids)
  }
}
