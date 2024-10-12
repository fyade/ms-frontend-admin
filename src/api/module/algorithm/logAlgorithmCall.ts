import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { LogAlgorithmCallDto, LogAlgorithmCallUpdDto } from "@/type/module/algorithm/logAlgorithmCall.ts";

export const logAlgorithmCallApi: ApiConfig<LogAlgorithmCallDto, LogAlgorithmCallUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/algorithm//log-algorithm-call',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/algorithm//log-algorithm-call/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/algorithm//log-algorithm-call/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/algorithm//log-algorithm-call/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/algorithm//log-algorithm-call',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/algorithm//log-algorithm-call',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/algorithm//log-algorithm-call/s',
    method: 'POST',
    data: objs
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/algorithm//log-algorithm-call/s',
    method: 'PUT',
    data: objs
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/algorithm//log-algorithm-call',
    method: 'DELETE',
    data: ids
  })
}
