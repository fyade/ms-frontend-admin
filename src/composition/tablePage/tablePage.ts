import { nextTick, onMounted, toRaw, watch } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { final, Operate } from "@/utils/base.ts"
import { t_funcTablePage_params } from "@/type/tablePage.ts";

export const funcTablePage = ({
                                config,
                                state,
                                // state2,
                                dialogFormRef,
                                dialogFormsRef,
                                filterFormRef,
                                dialogVisible,
                                dialogLoadingRef,
                                tableLoadingRef,
                                // switchLoadingRef,
                                activeTabName,
                                func,
                                props
                              }: t_funcTablePage_params) => {
  const initialStateDialogForm = structuredClone(toRaw(state.dialogForm))
  const initialStateDFormRules = structuredClone(toRaw(state.dFormRules));

  const ifRequired = (key: string) => state.dFormRules[key] && (state.dFormRules[key] as any[]).some((item: any) => item.required)

  /**
   * 查询
   */
  const getData = () => {
    tableLoadingRef.value = true
    state.list = []
    const ifByPage = !Object.keys(config).includes('pageQuery') || config?.pageQuery !== false;
    const obj = ifByPage ? {...state.pageParam, ...state.filterForm, ...config?.selectParam} : {...state.filterForm, ...config?.selectParam}
    func.selectList(obj).then(res => {
      if (ifByPage) {
        state.list = res.list
        state.total = res.total
      } else {
        state.list = res
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
  //   // func.selectById(id).then(res => {
  //   //   state.list[state.list.findIndex((item: any) => item.id === id)] = res
  //   // }).finally(() => {
  //   //   tableLoadingRef.value = false
  //   // })
  // }
  /**
   * 新增
   */
  const insData = () => {
    if (activeTabName && activeTabName.value === final.more) {
      func.insertMore && func.insertMore(state.dialogForms).then(res => {
        if (res) {
          ElMessage.success(Operate.success)
          dialogVisible.value = false
          getData()
        }
      })
    } else if (!activeTabName || activeTabName.value === final.one) {
      func.insertOne(state.dialogForm).then(res => {
        if (res) {
          ElMessage.success(Operate.success)
          dialogVisible.value = false
          getData()
        }
      })
    }
  }
  /**
   * 修改
   */
  const updData = () => {
    tableLoadingRef.value = true
    if (activeTabName?.value === final.more) {
      func.updateMore && func.updateMore(state.dialogForms).then(res => {
        if (res) {
          ElMessage.success(Operate.success)
          dialogVisible.value = false
          getData()
        } else {
          tableLoadingRef.value = false
        }
      }).catch(() => {
        tableLoadingRef.value = false
      })
    } else if (!activeTabName || activeTabName.value === final.one) {
      func.updateOne(state.dialogForm).then(res => {
        if (res) {
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
  }
  /**
   * 删除
   */
  const delData = (...ids: any[]) => {
    tableLoadingRef.value = true
    func.deleteList(...ids).then(res => {
      if (res) {
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
          if (state.dialogForms_error) {
            Object.keys(state.dialogForms_error).forEach(key => {
              delete state.dialogForms_error[key]
            })
          }
          dialogFormRef.value?.resetFields()
        }
        config.dialogVisibleCallback && config.dialogVisibleCallback(newVal)
      })
    })
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
    if (activeTabName && activeTabName.value === final.more && dialogFormsRef) {
      Object.keys(state.dialogForms_error).forEach(key => {
        delete state.dialogForms_error[key]
      })
      const keys = Object.keys(initialStateDFormRules)
      for (let i = 0; i < state.dialogForms.length; i++) {
        keys.forEach(key => {
          const value = state.dialogForms[i][key]
          const rule = state.dFormRules[key][0]
          if (rule.required && value === '') {
            state.dialogForms_error[`${i}-${key}`] = 'error'
          }
        })
      }
      if (Object.keys(state.dialogForms_error).length === 0) {
        const obj = {
          [final.ins]: () => insData(),
          [final.upd]: () => updData()
        }
        obj[state.dialogType.value]()
      } else {
        ElMessage.warning(`校验未通过，请完善表格中红框字段。`)
      }
    } else if (!activeTabName || activeTabName?.value === final.one) {
      dialogFormRef.value?.validate((valid, fields) => {
        if (valid) {
          const obj = {
            [final.ins]: () => insData(),
            [final.upd]: () => updData()
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
    state.dialogType.value = final.ins
    state.dialogType.label = '新增'
    if (activeTabName) {
      activeTabName.value = final.one
      state.dialogForms = []
      dfIns()
    }
    dialogVisible.value = true
  }
  // 修改
  const gUpd = async () => {
    // if (state.multipleSelection.length !== 1) {
    //   return ElMessage.warning('请选择 1 条数据。')
    // }
    await tUpd(state.multipleSelection[0].id, config.bulkOperation && state.multipleSelection.length > 1)
  }
  // 删除
  const gDel = ({
                  delids = []
                }: {
                  delids?: any[]
                } = {}
  ) => {
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
  // 修改
  const tUpd = async (id: any, ifMore?: boolean) => {
    state.dialogType.value = final.upd
    state.dialogType.label = '修改'
    dialogVisible.value = true
    nextTick(async () => {
      dialogLoadingRef.value = true
      if (ifMore) {
        if (activeTabName) {
          activeTabName.value = final.more
        }
        state.dialogForms.splice(0, state.dialogForms.length)
        if (func.selectByIds) {
          func.selectByIds(state.multipleSelection.map((item: any) => item.id)).then(res => {
            res.forEach((obj: any, i: number) => {
              state.dialogForms[i] = structuredClone(initialStateDialogForm)
              Object.keys(state.dialogForm).forEach(item => {
                state.dialogForms[i][item] = obj[item]
              })
            })
            config.beforeUpdateOneCallback2 && config.beforeUpdateOneCallback2(res)
          }).catch((e) => {
            dialogVisible.value = false
          }).finally(() => {
            dialogLoadingRef.value = false
          })
        } else {
          const datas: any[] = []
          for (let i = 0; i < state.multipleSelection.length; i++) {
            state.dialogForms[i] = structuredClone(initialStateDialogForm)
            try {
              const res = await func.selectById(state.multipleSelection[i].id)
              let obj = res
              datas.push(obj)
              // Object.keys(state.dialogForm).forEach(item => {
              //   state.dialogForms[i][item] = obj[item]
              // })
              // config.beforeUpdateOneCallback2 && config.beforeUpdateOneCallback2(res)
            } catch (e) {
              dialogVisible.value = false
            } finally {
              // dialogLoadingRef.value = false
            }
          }
          datas.forEach((_, i) => {
            Object.keys(state.dialogForm).forEach(item => {
              state.dialogForms[i][item] = datas[i][item]
            })
          })
          config.beforeUpdateOneCallback2 && config.beforeUpdateOneCallback2(datas)
          dialogLoadingRef.value = false
        }
      } else {
        if (activeTabName) {
          activeTabName.value = final.one
        }
        func.selectById(id).then(res => {
          let obj = res
          Object.keys(state.dialogForm).forEach(item => {
            state.dialogForm[item] = obj[item]
          })
          config.beforeUpdateOneCallback2 && config.beforeUpdateOneCallback2(res)
        }).catch(() => {
          dialogVisible.value = false
        }).finally(() => {
          dialogLoadingRef.value = false
        })
      }
    })
  }
  // 删除
  const tDel = (id: any) => {
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

  const dfIns = () => {
    state.dialogForms.push(structuredClone(initialStateDialogForm))
  }

  const dfDel = (index: number) => {
    state.dialogForms.splice(index, 1)
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
    pageChange,
    dfIns,
    dfDel,
    ifRequired
  }
}