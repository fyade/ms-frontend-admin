import { computed, nextTick, onMounted, reactive, Ref, ref, toRaw, watch } from "vue"
import { ElMessage, ElMessageBox, FormInstance, FormItemRule, type FormRules } from "element-plus"
import { final, Operate, PAGINATION } from "@/utils/base.ts"
import { ApiConfig, State2, TablePageConfig } from "@/type/tablePage.ts";
import { copyObject, deepClone, ifHasKey, ifValid } from "@/utils/ObjectUtils.ts";
import { downloadFromBlob } from "@/utils/DownloadUtils.ts";
import { Workbook } from "exceljs";
import { selectFiles } from "@/utils/FileUtils.ts";
import { TypeIU, TypeOM } from "@/type/utils/base.ts";

const exportIgnoreKeys = ['createRole', 'updateRole', 'createBy', 'updateBy', 'createTime', 'updateTime', 'deleted']
const importIgnoreKeys = ['id', ...exportIgnoreKeys]
export const funcTablePage = <T extends { id: number | string }, T2 = T>({
                                                                           state,
                                                                           dFormRules = {},
                                                                           config = new TablePageConfig(),
                                                                           api,
                                                                           dict
                                                                         }: {
                                                                           state: State2<T, T2>
                                                                           dFormRules: FormRules,
                                                                           config: TablePageConfig
                                                                           api: ApiConfig<T, T2>
                                                                           dict: { [P in keyof T]: string }
                                                                         }
) => {
  const dialogFormRef = ref<FormInstance | null>(null)
  const dialogFormsRef = ref<FormInstance | null>(null)
  const filterFormRef = ref<FormInstance | null>(null)
  const filterFormVisible = ref<boolean>(true)
  const dialogVisible = ref<boolean>(false)
  const dialogLoadingRef = ref<boolean>(false)
  const dialogButtonLoadingRef = ref<boolean>(false)
  const tableLoadingRef = ref<boolean>(false)
  const switchLoadingRef = ref<boolean>(false)
  const activeTabName = ref<TypeOM>(final.one)
  const tableData: Ref<T[]> = ref([])
  const pageParam = reactive({
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  })
  const total = ref<number>(0)
  const multipleSelection: Ref<T[]> = ref([])
  const dialogType = reactive<{ value: TypeIU, label: string }>({
    value: final.ins,
    label: ''
  })

  const initialStateDialogForm = structuredClone(toRaw(state.dialogForm));
  const initialStateDFormRules = structuredClone(toRaw(dFormRules));
  const ifHasConfig = (key: keyof TablePageConfig, value: string | boolean) => {
    return Object.keys(config).includes(key) && config[key] === value
  }

  const ifRequired = (key: string) => dFormRules[key] && (dFormRules[key] as FormItemRule[]).some(item => item.required)

  /**
   * 查询
   */
  const getData = () => {
    tableLoadingRef.value = true
    // tableData.value = []
    const ifByPage = !ifHasConfig('pageQuery', false)
    if (ifByPage) {
      config.beforeSelectListCallback && config.beforeSelectListCallback()
      api.selectList({...pageParam, ...state.filterForm, ...(config.selectParam || {})}).then(res => {
        tableData.value = res.list
        total.value = res.total
        config.selectListCallback && config.selectListCallback()
      }).finally(() => {
        tableLoadingRef.value = false
      })
    }
    if (!ifByPage) {
      config.beforeSelectListCallback && config.beforeSelectListCallback()
      api.selectAll({...state.filterForm, ...(config.selectParam || {})} as any).then(res => {
        tableData.value = res
        config.selectListCallback && config.selectListCallback()
      }).finally(() => {
        tableLoadingRef.value = false
      })
    }
  }
  /**
   * 新增
   * @param ifImport
   * @param dataFromExcel
   */
  const insData = ({
                     ifImport = false,
                     dataFromExcel = []
                   }: {
                     ifImport?: boolean
                     dataFromExcel?: T2[]
                   } = {}
  ) => {
    if (ifImport || activeTabName && activeTabName.value === final.more) {
      config.beforeInsertCallback && config.beforeInsertCallback(dialogType.value)
      api.insertMore((ifImport ? dataFromExcel : state.dialogForms!).map(item => ({...item, ...config.insUpdParam}))).then(res => {
        if (ifValid(res)) {
          ElMessage.success(Operate.success)
          dialogVisible.value = false
          config.insertCallback && config.insertCallback(dialogType.value)
          getData()
        }
      }).finally(() => {
        dialogButtonLoadingRef.value = false
      })
    } else if (!activeTabName || activeTabName.value === final.one) {
      config.beforeInsertCallback && config.beforeInsertCallback(dialogType.value)
      api.insertOne({...state.dialogForm, ...config.insUpdParam}).then(res => {
        if (ifValid(res)) {
          ElMessage.success(Operate.success)
          dialogVisible.value = false
          config.insertCallback && config.insertCallback(dialogType.value)
          getData()
        }
      }).finally(() => {
        dialogButtonLoadingRef.value = false
      })
    }
  }
  /**
   * 修改
   */
  const updData = () => {
    tableLoadingRef.value = true
    if (activeTabName.value === final.more) {
      config.beforeUpdateCallback && config.beforeUpdateCallback(dialogType.value)
      api.updateMore((state.dialogForms!).map(item => ({...item, ...config.insUpdParam}))).then(res => {
        if (ifValid(res)) {
          ElMessage.success(Operate.success)
          dialogVisible.value = false
          config.updateCallback && config.updateCallback(dialogType.value)
          getData()
        } else {
          tableLoadingRef.value = false
        }
      }).catch(() => {
        tableLoadingRef.value = false
      }).finally(() => {
        dialogButtonLoadingRef.value = false
      })
    } else if (!activeTabName || activeTabName.value === final.one) {
      config.beforeUpdateCallback && config.beforeUpdateCallback(dialogType.value)
      api.updateOne({...state.dialogForm, ...config.insUpdParam}).then(res => {
        if (ifValid(res)) {
          ElMessage.success(Operate.success)
          dialogVisible.value = false
          config.updateCallback && config.updateCallback(dialogType.value)
          getData()
        } else {
          tableLoadingRef.value = false
        }
      }).catch(() => {
        tableLoadingRef.value = false
      }).finally(() => {
        dialogButtonLoadingRef.value = false
      })
    }
  }
  /**
   * 删除
   * @param ids
   */
  const delData = (...ids: (number | string)[]) => {
    tableLoadingRef.value = true
    config.beforeDeleteCallback && config.beforeDeleteCallback()
    api.deleteList(...ids).then(res => {
      if (ifValid(res)) {
        ElMessage.success(Operate.success)
        config.deleteCallback && config.deleteCallback()
        getData()
      } else {
        tableLoadingRef.value = false
      }
    }).catch(() => {
      tableLoadingRef.value = false
    })
  }

  onMounted(() => {
    if (!ifHasConfig('getDataOnMounted', false)) {
      getData()
    }
  })
  if (!ifHasConfig('watchDialogVisible', false)) {
    watch(dialogVisible, (newVal) => {
      nextTick(() => {
        if (newVal) {
        } else {
          if (state.dialogForms_error) {
            Object.keys(state.dialogForms_error).forEach(key => {
              delete state.dialogForms_error![key]
            })
          }
          dialogFormRef.value?.resetFields()
        }
        config.dialogVisibleCallback && config.dialogVisibleCallback(newVal)
      })
    })
  }
  if (ifHasConfig('bulkOperation', true) && activeTabName) {
    watch(activeTabName, newVal => {
      dialogFormRef.value?.resetFields()
      config.changeActiveTabNameCallback && config.changeActiveTabNameCallback(newVal)
    })
  }

  // 弹窗取消
  const dCan = () => {
    dialogVisible.value = false
  }
  // 弹窗确定
  const dCon = () => {
    dialogButtonLoadingRef.value = true
    // 去掉dialog表单中string类型的数据的前后空格
    Object.keys(state.dialogForm as object).forEach(ite => {
      const item = ite as keyof typeof state.dialogForm
      if (typeof state.dialogForm[item] === 'string') {
        (state.dialogForm[item] as string) = (state.dialogForm[item] as string).trim()
      }
    })
    if (activeTabName && activeTabName.value === final.more && dialogFormsRef) {
      Object.keys(state.dialogForms_error!).forEach(key => {
        delete state.dialogForms_error![key]
      })
      const keys = Object.keys(initialStateDFormRules)
      for (let i = 0; i < state.dialogForms!.length; i++) {
        keys.forEach(key => {
          const rule = (dFormRules[key] as FormItemRule[])[0]
          if (rule.required && (state.dialogForms![i] as any)[key] === '') {
            state.dialogForms_error![`${i}-${key}`] = 'error'
          }
        })
      }
      if (Object.keys(state.dialogForms_error!).length === 0) {
        if (dialogType.value === final.ins) insData()
        if (dialogType.value === final.upd) updData()
      } else {
        ElMessage.warning(`校验未通过，请完善表格中红框字段。`)
        dialogButtonLoadingRef.value = false
      }
    } else if (!activeTabName || activeTabName.value === final.one) {
      dialogFormRef.value?.validate((valid, fields) => {
        if (valid) {
          if (dialogType.value === final.ins) insData()
          if (dialogType.value === final.upd) updData()
        } else {
          if (fields) {
            let arr: string[] = []
            Object.keys(fields).forEach(item => arr.push(dict[item as keyof typeof dict]))
            ElMessage.warning(`${arr.join('、')}不能为空。`)
          }
          dialogButtonLoadingRef.value = false
        }
      })
    }
  }
  // 筛选
  const fEnter = () => {
    fCon()
  }
  // 筛选
  const fCon = () => {
    Object.keys(state.filterForm).forEach(item => {
      if (typeof state.filterForm[item as keyof typeof state.filterForm] === 'string') {
        (state.filterForm[item as keyof typeof state.filterForm] as string) = (state.filterForm[item as keyof typeof state.filterForm] as string).trim()
      }
    })
    pageParam.pageNum = 1
    getData()
  }
  // 重置
  const fCan = () => {
    filterFormRef.value?.resetFields()
    getData()
  }
  // 刷新
  const gRefresh = () => {
    getData()
  }
  // 新增
  const gIns = () => {
    dialogType.value = final.ins
    dialogType.label = '新增'
    if (activeTabName) {
      activeTabName.value = final.one
      state.dialogForms = []
      dfIns()
    }
    dialogVisible.value = true
  }
  // 修改
  const gUpd = async () => {
    await tUpd(multipleSelection.value[0].id, !!config.bulkOperation && multipleSelection.value.length > 1)
  }
  // 删除
  const gDel = ({
                  delids = []
                }: {
                  delids?: (number | string)[]
                } = {}
  ) => {
    if (multipleSelection.value.length === 0) {
      return ElMessage.warning('请至少选择 1 条数据。')
    }
    ElMessageBox.confirm(
        `此操作将删除选中的 ${multipleSelection.value.length} 条数据，且无法撤销，请确认是否继续？`,
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          draggable: true
        }
    ).then(() => {
      const arr: (number | string)[] = multipleSelection.value.map(item => item.id)
      delData(...arr)
    }).catch(() => {
    })
  }
  // 导出
  const gExport = async ({
                           fileName = 'data.xlsx'
                         }: {
                           fileName?: string
                         } = {}
  ) => {
    await ElMessageBox.confirm(
        '目前只支持单表导出，不支持子主表、树表等所有涉及父子关系的导出，请确认是否知晓？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
    const rows = deepClone<T[]>(toRaw(multipleSelection.value).map((item) => toRaw(item))).map(obj => {
      exportIgnoreKeys.forEach(key => {
        delete obj[key as keyof typeof obj]
      })
      return obj
    }) as {}[];
    const workbook = new Workbook();
    // 添加sheet
    const worksheet = workbook.addWorksheet('sheet');
    // 设置列
    worksheet.columns = Object.keys(rows[0]).map(key => ({header: key, key: key, width: 15}))
    // 设置行
    worksheet.addRows(rows)
    worksheet.getRows(1, rows.length + 1)?.forEach(row => {
      row.height = 20
    })
    // 导出excel
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {type: ''})
    downloadFromBlob(blob, fileName)
  }
  // 导入
  const gImport = async () => {
    await ElMessageBox.confirm(
        '目前只支持单表导入，不支持子主表、树表等所有涉及父子关系的导入，请确认是否知晓？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
    const sFiles = await selectFiles()
    if (sFiles.length === 0) {
      return
    }
    const file = sFiles[0]
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const buffer = e.target!.result! as ArrayBuffer
      const workbook_ = new Workbook();
      const workbook = await workbook_.xlsx.load(buffer)
      const worksheet = workbook.getWorksheet(1)
      if (!worksheet) {
        ElMessage.warning('读取Excel失败。')
        return
      }
      const sheetValues = worksheet.getSheetValues();
      const values: any[] = []
      sheetValues.slice(2).forEach(item => {
        const obj = (item as any[]).reduce((a, c, i) => ({...a, [(sheetValues[1] as any[])[i]]: c}), {});
        if (config.selectParam) {
          copyObject(obj, config.selectParam)
        }
        importIgnoreKeys.forEach(key => {
          delete obj[key]
        })
        values.push(obj)
      })
      // 打开弹窗
      if (!Object.keys(state).includes('dialogForms') || !ifHasConfig('bulkOperation', true)) {
        ElMessage.warning('当前页面不支持批量导入。')
        return
      }
      gIns()
      activeTabName.value = final.more
      state.dialogForms = []
      values.forEach(value => {
        state.dialogForms?.push(value)
      })
    }
    reader.onerror = e => {
      console.error(e)
    }
    reader.readAsArrayBuffer(file);
  }
  // 显示/隐藏筛选表达
  const gChangeFilterFormVisible = () => {
    filterFormVisible.value = !filterFormVisible.value
  }
  // 查看
  const tView = (id: number | string) => {
    api.selectById(id).then(res => {
      const keys = Object.keys(state.dialogForm as object) as (keyof T)[];
      ElMessageBox.alert(
          `
<div class="zs-view-data-message-box">
  <el-row>
    <el-col :span="12">
      <p>
        <span>${dict.id}</span>
        <span>${res.id}</span>
      </p>
    </el-col>
  </el-row>
  ${keys.filter(item => item !== 'id').map(key => `
<el-row>
  <p>
    <span>${dict[key]}</span>
    <span>${res[key]}</span>
  </p>
</el-row>
`).join('')}
</div>
          `,
          '查看',
          {
            dangerouslyUseHTMLString: true,
            draggable: true,
            closeOnClickModal: true,
            closeOnPressEscape: true,
          }
      )
    })
  }
  // 修改
  const tUpd = async (id: number | string, ifMore?: boolean) => {
    dialogType.value = final.upd
    dialogType.label = '修改'
    dialogVisible.value = true
    await nextTick(async () => {
      dialogLoadingRef.value = true
      if (ifMore) {
        if (activeTabName) {
          activeTabName.value = final.more
        }
        state.dialogForms!.splice(0, state.dialogForms!.length)
        if (api.selectByIds) {
          api.selectByIds(multipleSelection.value.map(item => item.id)).then(res => {
            res.forEach((obj, i) => {
              state.dialogForms![i] = structuredClone(initialStateDialogForm)
              copyObject(state.dialogForms![i], obj as unknown as T2)
            })
          }).catch((e) => {
            dialogVisible.value = false
          }).finally(() => {
            dialogLoadingRef.value = false
            config.dialogFormLoadingFinishCallback && config.dialogFormLoadingFinishCallback(activeTabName.value)
          })
        } else {
          const datas: T2[] = []
          for (let i = 0; i < multipleSelection.value.length; i++) {
            state.dialogForms![i] = structuredClone(initialStateDialogForm)
            try {
              const obj = await api.selectById(multipleSelection.value[i].id)
              datas.push(obj as any)
            } catch (e) {
              dialogVisible.value = false
            } finally {
            }
          }
          datas.forEach((_, i) => {
            copyObject(state.dialogForms![i], datas[i])
          })
          dialogLoadingRef.value = false
          config.dialogFormLoadingFinishCallback && config.dialogFormLoadingFinishCallback(activeTabName.value)
        }
      } else {
        if (activeTabName) {
          activeTabName.value = final.one
        }
        api.selectById(id).then(res => {
          copyObject(state.dialogForm, res as unknown as T2, exportIgnoreKeys)
        }).catch(() => {
          dialogVisible.value = false
        }).finally(() => {
          dialogLoadingRef.value = false
          config.dialogFormLoadingFinishCallback && config.dialogFormLoadingFinishCallback(activeTabName.value)
        })
      }
    })
  }
  // 删除
  const tDel = (id: number | string) => {
    ElMessageBox.confirm(
        `此操作将删除选中的 1 条数据，且无法撤销，请确认是否继续？`,
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          draggable: true
        }
    ).then(() => {
      delData(id)
    }).catch(() => {
    })
  }
  const handleSelectionChange = (val: T[]) => {
    multipleSelection.value = val
  }
  const pageChange = (newVal: { pageNum: number, pageSize: number }) => {
    pageParam.pageNum = newVal.pageNum
    pageParam.pageSize = newVal.pageSize
    getData()
  }

  const refresh = () => {
    getData()
  }

  const dfIns = () => {
    config.activeTabMoreInsCallback && config.activeTabMoreInsCallback()
    state.dialogForms!.push(structuredClone(initialStateDialogForm))
    config.activeTabMoreInsFinishCallback && config.activeTabMoreInsFinishCallback()
  }

  const dfDel = (index: number) => {
    config.activeTabMoreDelCallback && config.activeTabMoreDelCallback(index)
    state.dialogForms!.splice(index, 1)
  }

  const filterFormVisible1 = computed(() => ifHasKey(state, 'filterForm') && Object.keys(state.filterForm).length > 0)

  return {
    dialogFormRef,
    dialogFormsRef,
    filterFormRef,
    filterFormVisible1,
    filterFormVisible,
    dialogVisible,
    dialogLoadingRef,
    dialogButtonLoadingRef,
    tableLoadingRef,
    switchLoadingRef,
    activeTabName,
    tableData,
    pageParam,
    total,
    multipleSelection,
    dialogType,
    refresh,
    dCan,
    dCon,
    fEnter,
    fCon,
    fCan,
    gRefresh,
    gIns,
    gUpd,
    gDel,
    gExport,
    gImport,
    gChangeFilterFormVisible,
    tView,
    tUpd,
    tDel,
    handleSelectionChange,
    pageChange,
    dfIns,
    dfDel,
    ifRequired
  }
}
