import { axiosVo } from "@/type/asiox.ts";
import { Ref } from "vue";
import type { FormInstance } from 'element-plus'

export interface t_config {
  selectParam: object
  getDataOnMounted: boolean
  pageQuery: boolean
  watchDialogVisible: boolean
  dialogVisibleCallback?: Function
  tableInlineOperate: boolean
}

type t_MyFuncType = (any: any) => Promise<axiosVo>
type t_MyFuncType2 = (...any: any[]) => Promise<axiosVo>

export interface t_FuncMap {
  selectList: t_MyFuncType
  selectById: t_MyFuncType
  insertOne: t_MyFuncType
  updateOne: t_MyFuncType
  deleteList: t_MyFuncType2
}

export interface t_funcTablePage_params {
  config: t_config
  state: any
  state2: any
  dialogFormRef: Ref<FormInstance | null>
  dialogFormInput1Ref: Ref<HTMLElement | null>
  filterFormRef: Ref<FormInstance | null>
  dialogVisible: Ref<boolean>
  dislogLoadingRef: Ref<boolean>
  tableLoadingRef: Ref<boolean>
  switchLoadingRef: Ref<boolean>
  func: t_FuncMap
}

export interface pageSelDto {
  pageNum: number
  pageSize: number
}
