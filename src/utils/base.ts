import { CascaderProps } from "element-plus";
import { N, Y } from '@/type/utils/base.ts'

export const CONFIG = {
  dialog_width: '800px',
  dialog_form_label_width: '120px',
  drawer_size: '80%',
  icon_white: '#ffffff',
  icon_black: '#000000'
}

export const PAGINATION = {
  pageNum: 1,
  pageSize: 10
}

export const publicDict = {
  id: '主键id',
  remark: '备注',
  order_num: '顺序',
  if_default: '是否默认',
  if_disabled: '是否禁用',
  create_by: 'createBy',
  update_by: 'updateBy',
  create_time: 'createTime',
  update_time: 'updateTime',
  deleted: '逻辑删除'
}

const Y = 'Y'
const N = 'N'
export const final: {
  Y: Y
  N: N
  DEFAULT_PARENT_ID: 0
  DEFAULT_ORDER_NUM: 0
} = {
  Y,
  N,
  DEFAULT_PARENT_ID: 0,
  DEFAULT_ORDER_NUM: 0,
}

export const Operate = {
  success: '操作成功。'
}

export const shift_yes_no = {
  Y: N,
  N: Y
}

export const publicCascaderProps = {
  value: 'id',
  label: 'label',
  disabled: 'casDisbaled'
} as CascaderProps
// 只能选择最子层
export const cascaderProps3 = {
  disabled: 'casDisbaled',
  expandTrigger: 'hover',
  emitPath: false // 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
} as CascaderProps
export const cascaderProps1 = {
  ...publicCascaderProps,
  ...cascaderProps3
} as CascaderProps
// 可以选择任何层
export const cascaderProps2 = {
  ...publicCascaderProps,
  expandTrigger: 'hover',
  emitPath: false, // 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
  checkStrictly: true // 是否严格的遵守父子节点不互相关联
} as CascaderProps
// 可以选择任何层且支持多选
export const cascaderProps4 = {
  ...cascaderProps2,
  multiple: true
} as CascaderProps
