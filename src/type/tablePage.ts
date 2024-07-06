import { Ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { MORE, ONE } from "@/type/utils/base.ts";

export interface State<T = object, T2 = object> {
  dialogType: {
    value: string
    label: string
  }
  dialogForm: T
  dialogForms?: T[]
  dialogForms_error?: object,
  dFormRules: FormRules
  dict: object
  filterForm: object
  list: object[]
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
  },
  beforeUpdateOneCallback1?: Function,
  beforeUpdateOneCallback2?: Function
}

type t_MyFuncType = (any: any) => Promise<any>
type t_MyFuncType2 = (...any: any[]) => Promise<any>

export interface t_FuncMap {
  selectList: t_MyFuncType
  selectById: t_MyFuncType
  selectByIds?: t_MyFuncType
  insertOne: t_MyFuncType
  updateOne: t_MyFuncType
  insertMore?: t_MyFuncType
  updateMore?: t_MyFuncType
  deleteList: t_MyFuncType2
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
}

export class pageSelDto {
  pageNum!: number
  pageSize!: number
}
