import request from "@/api/request.ts";
import {
  menuDto,
  menuSelDto,
  menuSelAllDto,
  menuInsDto,
  menuUpdDto
} from "@/type/api/main/sysManage/menu.ts";
import {
  t_funcMap,
  t_funcMap_selList_ret,
  t_funcMap_selMore_ret,
  t_funcMap_selOne_ret,
  t_funcMap_iud_ret
} from "@/type/tablePage.ts";

export function menuSel(params: menuSelDto): t_funcMap_selList_ret<menuDto> {
  return request({
    url: '/main/sys-manage/menu',
    method: 'GET',
    params: params
  })
}

export function menuSelAll(params: menuSelAllDto): t_funcMap_selMore_ret<menuDto> {
  return request({
    url: '/main/sys-manage/menu/all',
    method: 'GET',
    params: params
  })
}

export function menuSelById(id: number): t_funcMap_selOne_ret<menuDto> {
  return request({
    url: `/main/sys-manage/menu/${id}`,
    method: 'GET'
  })
}

export function menuSelByIds(ids: number[]): t_funcMap_selMore_ret<menuDto> {
  return request({
    url: `/main/sys-manage/menu/ids`,
    method: 'GET',
    params: ids
  })
}

export function menuIns(params: menuInsDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/menu',
    method: 'POST',
    data: params
  })
}

export function menuUpd(params: menuUpdDto): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/menu',
    method: 'PUT',
    data: params
  })
}

export function menuInss(params: menuInsDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/menu/s',
    method: 'POST',
    data: params
  })
}

export function menuUpds(params: menuUpdDto[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/menu/s',
    method: 'PUT',
    data: params
  })
}

export function menuDel(ids: number[]): t_funcMap_iud_ret {
  return request({
    url: '/main/sys-manage/menu',
    method: 'DELETE',
    data: ids
  })
}

export const menuFunc: t_funcMap<menuDto, menuSelDto, menuSelAllDto, menuInsDto, menuUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: menuSelDto) => {
    return menuSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: menuSelAllDto) => {
    return menuSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: number) => {
    return menuSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: number[]) => {
    return menuSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: menuInsDto) => {
    return menuIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: menuUpdDto) => {
    return menuUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: menuInsDto[]) => {
    return menuInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: menuUpdDto[]) => {
    return menuUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: number[]) => {
    return menuDel(ids)
  }
}
