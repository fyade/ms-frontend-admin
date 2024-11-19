import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { MenuIpWhiteListDto, MenuIpWhiteListUpdDto } from "@/type/module/main/sysManage/menuIpWhiteList.ts";

export const menuIpWhiteListApi: ApiConfig<MenuIpWhiteListDto, MenuIpWhiteListUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/sys-manage/menu-ip-white-list',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/sys-manage/menu-ip-white-list/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/sys-manage/menu-ip-white-list/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/sys-manage/menu-ip-white-list/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/sys-manage/menu-ip-white-list',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/sys-manage/menu-ip-white-list',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/sys-manage/menu-ip-white-list/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/sys-manage/menu-ip-white-list/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/sys-manage/menu-ip-white-list',
    method: 'DELETE',
    data: ids
  })
}
