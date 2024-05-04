import { nextTick, onMounted, watch } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Operate } from "@/utils/base.ts"
import { t_funcTablePage_params } from "@/type/tablePage.ts";

export const funcTablePage = ({
                                config,
                                state,
                                // state2,
                                dialogFormRef,
                                filterFormRef,
                                dialogVisible,
                                dislogLoadingRef,
                                tableLoadingRef,
                                // switchLoadingRef,
                                func,
                                props
                              }: t_funcTablePage_params) => {
  /**
   * 查询
   */
  const getData = () => {
    tableLoadingRef.value = true
    state.list = []
    const ifByPage = !Object.keys(config).includes('pageQuery') || config?.pageQuery !== false;
    const obj = ifByPage ? {...state.pageParam, ...state.filterForm, ...config?.selectParam} : {...state.filterForm, ...config?.selectParam}
    func.selectList(obj).then(({res}) => {
      if (ifByPage) {
        state.list = res.data.list
        state.total = res.data.total
      } else {
        state.list = res.data
      }
      config.selectListCallback && config.selectListCallback()
    }).finally(() => {
      tableLoadingRef.value = false
    })
  }
  // /**
  //  * 查询单个
  //  * @param id
  //  */
  // const getDataById = (id: any) => {
  //   // tableLoadingRef.value = true
  //   // func.selectById(id).then(({res}) => {
  //   //   state.list[state.list.findIndex((item: any) => item.id === id)] = res.data
  //   // }).finally(() => {
  //   //   tableLoadingRef.value = false
  //   // })
  // }
  /**
   * 新增
   */
  const insData = () => {
    let obj = state.dialogForm
    func.insertOne(obj).then(({res}) => {
      if (res.code === 200) {
        ElMessage.success(Operate.success)
        dialogVisible.value = false
        getData()
      }
    })
  }
  /**
   * 修改
   * @param obj
   */
  const updData = (obj = state.dialogForm) => {
    tableLoadingRef.value = true
    func.updateOne(obj).then(({res}) => {
      if (res.code === 200) {
        ElMessage.success(Operate.success)
        dialogVisible.value = false
        getData()
      } else {
        tableLoadingRef.value = false
      }
    }).catch(() => {
      tableLoadingRef.value = false
    })
  }
  /**
   * 删除
   */
  const delData = (...ids: any[]) => {
    tableLoadingRef.value = true
    func.deleteList(...ids).then(({res}) => {
      if (res.code === 200) {
        ElMessage.success(Operate.success)
        getData()
      } else {
        tableLoadingRef.value = false
      }
    }).catch(() => {
      tableLoadingRef.value = false
    })
  }

  onMounted(() => {
    if (config?.getDataOnMounted !== false) {
      getData()
    }
  })
  if (config?.watchDialogVisible !== false) {
    watch(dialogVisible, (newVal) => {
      nextTick(() => {
        if (newVal) {
        } else {
          dialogFormRef.value?.resetFields()
        }
        config.dialogVisibleCallback && config.dialogVisibleCallback(newVal)
      })
    })
  }
  if (config.one2MoreConfig?.oneKey && props) {
    state.dialogForm[config.one2MoreConfig?.oneKey] = props[config.one2MoreConfig?.oneKey]
  }

  // 弹窗取消
  const dCan = () => {
    dialogVisible.value = false
  }
  // 弹窗确定
  const dCon = () => {
    Object.keys(state.dialogForm).forEach(item => {
      if (typeof state.dialogForm[item] === 'string') {
        state.dialogForm[item] = state.dialogForm[item].trim()
      }
    })
    dialogFormRef.value?.validate((valid, fields) => {
      if (valid) {
        const obj = {
          ins: () => insData(),
          upd: () => updData()
        }
        obj[state.dialogType.value]()
      } else {
        if (fields) {
          let arr: any[] = []
          Object.keys(fields).forEach(item => arr.push(state.dict[item]))
          ElMessage.warning(`${arr.join('、')}不能为空。`)
        }
      }
    })
  }
  // 筛选
  const fEnter = () => {
    const hasValue = Object.values(state.filterForm).some((item: any) => !!item.toString().trim())
    if (hasValue) {
      fCon()
    } else {
      fCan()
    }
  }
  // 筛选
  const fCon = () => {
    Object.keys(state.filterForm).forEach(item => {
      if (typeof state.filterForm[item] === 'string') {
        state.filterForm[item] = state.filterForm[item].trim()
      }
    })
    state.pageParam.pageNum = 1
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
    state.dialogType.value = 'ins'
    state.dialogType.label = '新增'
    dialogVisible.value = true
  }
  // 修改
  const gUpd = () => {
    if (state.multipleSelection.length !== 1) {
      return ElMessage.warning('请选择 1 条数据。')
    }
    if (config.one2More && config.one2MoreConfig?.oneKey) {
      tUpd(state.multipleSelection[0][config.one2MoreConfig?.oneKey])
    } else {
      tUpd(state.multipleSelection[0].id)
    }
  }
  // 删除
  const gDel = ({
                  delids = []
                }: {
                  delids?: any[]
                } = {}
  ) => {
    if (config.one2More) {
      const permissionids = delids || state.list.filter((item: any) => state.multipleSelection.map((item: any) => item.id).indexOf(item.id) > -1).map((item: any) => item.permission_id).flat();
      if (permissionids.length === 0) {
        return ElMessage.warning('请至少选择 1 条数据。')
      }
      ElMessageBox.confirm(
          `此操作将删除选中的 ${permissionids.length} 条数据，且无法撤销，请确认是否继续？`,
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            draggable: true
          }
      ).then(() => {
        delData(...permissionids)
      })
    } else {
      if (state.multipleSelection.length === 0) {
        return ElMessage.warning('请至少选择 1 条数据。')
      }
      ElMessageBox.confirm(
          `此操作将删除选中的 ${state.multipleSelection.length} 条数据，且无法撤销，请确认是否继续？`,
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            draggable: true
          }
      ).then(() => {
        let arr: any[] = state.multipleSelection.map((item: any) => item.id)
        delData(...arr)
      })
    }
  }
  // 修改
  const tUpd = (id: any) => {
    state.dialogType.value = 'upd'
    state.dialogType.label = '修改'
    dialogVisible.value = true
    nextTick(() => {
      dislogLoadingRef.value = true
      if (config.one2More && config.one2MoreConfig?.oneKey) {
        func.selectList({[config.one2MoreConfig?.oneKey]: id}).then(({res}) => {
          let obj = res.data[0]
          Object.keys(state.dialogForm).forEach(item => {
            state.dialogForm[item] = obj[item]
          })
          config.beforeUpdateOneCallback1 && config.beforeUpdateOneCallback1(res.data)
        }).catch(() => {
          dialogVisible.value = false
        }).finally(() => {
          dislogLoadingRef.value = false
        })
      } else {
        func.selectById(id).then(({res}) => {
          let obj = res.data
          Object.keys(state.dialogForm).forEach(item => {
            state.dialogForm[item] = obj[item]
          })
          config.beforeUpdateOneCallback2 && config.beforeUpdateOneCallback2(res.data)
        }).catch(() => {
          dialogVisible.value = false
        }).finally(() => {
          dislogLoadingRef.value = false
        })
      }
    })
  }
  // 删除
  const tDel = (id: any) => {
    if (config.one2More) {
      const fined: any = state.list.find((item: any) => item.id === id);
      const permissionids = fined && fined.permission_id ? fined.permission_id : []
      gDel({delids: permissionids})
    } else {
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
      })
    }
  }
  const handleSelectionChange = (val: any) => {
    state.multipleSelection = val
  }
  const pageChange = (newVal: any) => {
    state.pageParam.pageNum = newVal.pageNum
    state.pageParam.pageSize = newVal.pageSize
    getData()
  }

  const refresh = () => {
    getData()
  }

  return {
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
    tUpd,
    tDel,
    handleSelectionChange,
    pageChange
  }
}