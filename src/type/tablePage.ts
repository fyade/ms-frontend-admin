import { TypeIU, TypeOM } from "@/type/utils/base.ts";

interface DialogForms_error {
  [key: string]: boolean | string
}

export interface State2<T = object, T2 = T> {
  dialogForm: T2
  dialogForms?: T2[]
  dialogForms_error?: DialogForms_error
  filterForm: {
    [P in keyof T]?: T[P]
  }
}

export class BaseClass {
  createBy?: string;
  updateBy?: string;
  createTime?: Date;
  updateTime?: Date;
  deleted?: string;
}

export class BaseClass2 {
  create_by?: string;
  update_by?: string;
  create_time?: Date;
  update_time?: Date;
  deleted?: string;
}

export class PageDto {
  pageNum!: number
  pageSize!: number
}

export interface ApiConfig<T, T2 = T> {
  selectList: (obj: { [P in keyof Omit<T2, 'id'>]?: any } & { [P in keyof PageDto]: PageDto[P] }) => Promise<{
    list: T[],
    total: number
  }>
  selectAll: (obj: { [P in keyof Omit<T2, 'id'>]?: any }) => Promise<T[]>
  selectById: (id: number | string) => Promise<T>
  selectByIds: (ids: (number | string)[]) => Promise<T[]>
  insertOne: (obj: Omit<T2, 'id'>) => Promise<any>
  updateOne: (obj: T2) => Promise<any>
  insertMore: (obj: Omit<T2, 'id'>[]) => Promise<any>
  updateMore: (obj: T2[]) => Promise<any>
  deleteList: (...ids: (number | string)[]) => Promise<any>
}

export class TablePageConfig {
  /**
   * 补充的查询参数
   */
  selectParam
  /**
   * 补充的新增及修改参数
   */
  insUpdParam
  /**
   * 页面加载时获取数据，默认true
   */
  getDataOnMounted
  /**
   * 分页，默认true
   */
  pageQuery
  /**
   * 监听dialogVisible变化，默认true
   */
  watchDialogVisible
  /**
   * dialogVisible变化时的回调
   */
  dialogVisibleCallback
  /**
   * selectList前的回调
   */
  beforeSelectListCallback
  /**
   * selectList回调
   */
  selectListCallback
  /**
   * 新增前的回调
   */
  beforeInsertCallback
  /**
   * 新增的回调
   */
  insertCallback
  /**
   * 修改前的回调
   */
  beforeUpdateCallback
  /**
   * 修改的回调
   */
  updateCallback
  /**
   * 删除前的回调
   */
  beforeDeleteCallback
  /**
   * 删除的回调
   */
  deleteCallback
  /**
   * 弹出表单是否支持批量操作，默认false
   */
  bulkOperation
  /**
   * 弹出表单切换操作单个与操作多个前调用的事件
   */
  changeActiveTabNameCallback
  /**
   * 弹出表单为操作多个时，新增之前的回调函数
   */
  activeTabMoreInsCallback
  /**
   * 弹出表单为操作多个时，新增之后的回调函数
   */
  activeTabMoreInsFinishCallback
  /**
   * 弹出表单为操作多个时，删除的回调函数
   */
  activeTabMoreDelCallback

  constructor({
                selectParam = {},
                insUpdParam = {},
                getDataOnMounted = true,
                pageQuery = true,
                watchDialogVisible = true,
                dialogVisibleCallback = null,
                beforeSelectListCallback = null,
                selectListCallback = null,
                beforeInsertCallback = null,
                insertCallback = null,
                beforeUpdateCallback = null,
                updateCallback = null,
                beforeDeleteCallback = null,
                deleteCallback = null,
                bulkOperation = false,
                changeActiveTabNameCallback = null,
                activeTabMoreInsCallback = null,
                activeTabMoreInsFinishCallback = null,
                activeTabMoreDelCallback = null,
              }: {
                selectParam?: object
                insUpdParam?: object
                getDataOnMounted?: boolean
                pageQuery?: boolean
                watchDialogVisible?: boolean
                dialogVisibleCallback?: null | Function
                beforeSelectListCallback?: null | Function
                selectListCallback?: null | Function
                beforeInsertCallback?: null | ((dialogType: TypeIU) => void)
                insertCallback?: null | ((dialogType: TypeIU) => void)
                beforeUpdateCallback?: null | ((dialogType: TypeIU) => void)
                updateCallback?: null | ((dialogType: TypeIU) => void)
                beforeDeleteCallback?: null | Function
                deleteCallback?: null | Function
                bulkOperation?: boolean
                changeActiveTabNameCallback?: null | ((newVal: TypeOM) => void)
                activeTabMoreInsCallback?: null | Function
                activeTabMoreInsFinishCallback?: null | Function
                activeTabMoreDelCallback?: null | ((index: number) => void)
              } = {}
  ) {
    this.selectParam = selectParam;
    this.insUpdParam = insUpdParam;
    this.getDataOnMounted = getDataOnMounted;
    this.pageQuery = pageQuery;
    this.watchDialogVisible = watchDialogVisible;
    this.dialogVisibleCallback = dialogVisibleCallback;
    this.beforeSelectListCallback = beforeSelectListCallback;
    this.selectListCallback = selectListCallback;
    this.beforeInsertCallback = beforeInsertCallback;
    this.insertCallback = insertCallback;
    this.beforeUpdateCallback = beforeUpdateCallback;
    this.updateCallback = updateCallback;
    this.beforeDeleteCallback = beforeDeleteCallback;
    this.deleteCallback = deleteCallback;
    this.bulkOperation = bulkOperation;
    this.changeActiveTabNameCallback = changeActiveTabNameCallback;
    this.activeTabMoreInsCallback = activeTabMoreInsCallback;
    this.activeTabMoreInsFinishCallback = activeTabMoreInsFinishCallback;
    this.activeTabMoreDelCallback = activeTabMoreDelCallback;
  }
}
