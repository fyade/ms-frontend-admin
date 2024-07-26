import { Ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { MORE, ONE } from "@/type/utils/base.ts";

interface dialogForms_error {
  [key: string]: boolean | string
}

export interface State<T = object, T2 = T> {
  dialogType: {
    value: string
    label: string
  }
  dialogForm: T2
  dialogForms?: T2[]
  dialogForms_error?: dialogForms_error
  dFormRules: FormRules
  dict: {
    [P in keyof T]?: string
  }
  filterForm: {
    [P in keyof T]?: string
  }
  list: T[]
  multipleSelection: T[]
  total: number
  pageParam: {
    pageNum: number
    pageSize: number
  }
}

export interface t_config {
  /**
   * 补充的查询参数
   */
  selectParam?: object
  /**
   * 页面加载时获取数据，默认true
   */
  getDataOnMounted?: boolean
  /**
   * 分页，默认true
   */
  pageQuery?: boolean
  /**
   * 监听dialogVisible变化，默认true
   */
  watchDialogVisible?: boolean
  /**
   * dialogVisible变化时的回调，可不传
   * @param visible 变化后的值
   */
  dialogVisibleCallback?: Function
  /**
   * selectList回调，可不传
   */
  selectListCallback?: Function
  /**
   * 弹出表单是否支持批量操作，默认false
   */
  bulkOperation?: boolean
  one2More?: boolean
  one2MoreConfig?: {
    oneKey: string
    moreKey: string
  }
  /**
   * 修改单个前的查询的回调，可不传，one2More为true时调这个
   * @param res
   */
  beforeUpdateOneCallback1?: Function
  /**
   * 修改单个前的查询的回调，可不传，one2More为false时调这个
   * @param res
   */
  beforeUpdateOneCallback2?: Function
}

export type t_funcMap_selList_ret<T = any> = Promise<{ list: T[], total: number }>
export type t_funcMap_selMore_ret<T = any> = Promise<T[]>
export type t_funcMap_selOne_ret<T = any> = Promise<T>
export type t_funcMap_iud_ret = Promise<any>
export type t_funcMap_selList<T = any, T2 = any> = (any: T) => t_funcMap_selList_ret<T2>
export type t_funcMap_selAll<T = any, T2 = any> = (any: T) => t_funcMap_selMore_ret<T2>
export type t_funcMap_selById<T = any> = (any: any) => t_funcMap_selOne_ret<T>
export type t_funcMap_selByIds<T = any> = (any: any[]) => t_funcMap_selMore_ret<T>
export type t_funcMap_updOne<T = any> = (any: T) => t_funcMap_iud_ret
export type t_funcMap_updMore<T = any> = (any: T[]) => t_funcMap_iud_ret
export type t_funcMap_del = (...any: any[]) => t_funcMap_iud_ret

export interface t_funcMap<T = any, T2 = any, T3 = any, T4 = any, T5 = any> {
  selectList: t_funcMap_selList<T2, T>
  selectAll: t_funcMap_selAll<T3, T>
  selectById: t_funcMap_selById<T>
  selectByIds: t_funcMap_selByIds<T>
  insertOne: t_funcMap_updOne<T4>
  updateOne: t_funcMap_updOne<T5>
  insertMore: t_funcMap_updMore<T4>
  updateMore: t_funcMap_updMore<T5>
  deleteList: t_funcMap_del
}

export interface t_funcTablePage_params {
  config: t_config
  state: any
  state2: any
  dialogFormRef: Ref<FormInstance | null>
  dialogFormsRef?: Ref<FormInstance | null>
  filterFormRef: Ref<FormInstance | null>
  dialogVisible: Ref<boolean>
  dialogLoadingRef: Ref<boolean>
  tableLoadingRef: Ref<boolean>
  switchLoadingRef: Ref<boolean>
  activeTabName?: Ref<ONE | MORE>
  func: t_funcMap
  props?: any
  exportIgnoreKeys?: string[]
}

export class pageDto {
  pageNum!: number
  pageSize!: number
}
