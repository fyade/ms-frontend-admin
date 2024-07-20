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
  dialogForm: T
  dialogForms?: T[]
  dialogForms_error?: dialogForms_error
  dFormRules: FormRules
  dict: {
    [P in keyof T]?: string
  }
  filterForm: {
    [P in keyof T]?: string
  }
  list: T2[]
  multipleSelection: T2[]
  total: number
  pageParam: {
    pageNum: number
    pageSize: number
  }
}

export interface t_config {
  selectParam: object
  getDataOnMounted?: boolean
  pageQuery: boolean
  watchDialogVisible: boolean
  dialogVisibleCallback?: Function
  selectListCallback?: Function
  bulkOperation?: boolean
  one2More?: boolean
  one2MoreConfig?: {
    oneKey: string
    moreKey: string
  }
  beforeUpdateOneCallback1?: Function
  beforeUpdateOneCallback2?: Function
}

export interface t_FuncMap {
  selectList: <T = any>(any: any) => Promise<{ list: T[], total: number }>
  selectAll?: <T = any>(any: any) => Promise<T[]>
  selectById: <T = any>(any: any) => Promise<T>
  selectByIds?: <T = any>(any: any[]) => Promise<T[]>
  insertOne: <T = any>(any: T) => Promise<any>
  updateOne: <T = any>(any: T) => Promise<any>
  insertMore?: <T = any>(any: T[]) => Promise<any>
  updateMore?: <T = any>(any: T[]) => Promise<any>
  deleteList: (...any: any[]) => Promise<any>
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
  func: t_FuncMap
  props?: any
  exportIgnoreKeys?: string[]
}

export class pageDto {
  pageNum!: number
  pageSize!: number
}
