import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { InterfaceInterfaceGroupDto, InterfaceInterfaceGroupUpdDto, InterfaceInterfaceGroupUpdIIGDto, InterfaceInterfaceGroupUpdIGIDto } from "@/type/module/algorithm/interfaceInterfaceGroup.ts";

export const interfaceInterfaceGroupApi: ApiConfig<InterfaceInterfaceGroupDto, InterfaceInterfaceGroupUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/algorithm/interface-interface-group',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/algorithm/interface-interface-group/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/algorithm/interface-interface-group/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/algorithm/interface-interface-group/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/algorithm/interface-interface-group',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/algorithm/interface-interface-group',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/algorithm/interface-interface-group/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/algorithm/interface-interface-group/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/algorithm/interface-interface-group',
    method: 'DELETE',
    data: ids
  })
}

export function interfaceInterfaceGroupUpdIIG(params: InterfaceInterfaceGroupUpdIIGDto) {
  return request({
    url: '/algorithm/interface-interface-group/iig',
    method: 'POST',
    data: params
  })
}

export function interfaceInterfaceGroupUpdIGI(params: InterfaceInterfaceGroupUpdIGIDto) {
  return request({
    url: '/algorithm/interface-interface-group/igi',
    method: 'POST',
    data: params
  })
}
