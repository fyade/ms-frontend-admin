<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.ts"
import { State, t_config, t_FuncMap } from "@/type/tablePage.ts"
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts"
import { interfaceDto } from "@/type/api/sysManage/interface.ts";
import {
  interfaceSel,
  interfaceSelById,
  interfaceSelByIds,
  interfaceSelAll,
  interfaceIns,
  interfaceUpd,
  interfaceInss,
  interfaceUpds,
  interfaceDel,
} from "@/api/module/sysManage/interface.ts"
import { interfaceGroupDto } from "@/type/api/sysManage/interfaceGroup.ts";
import {
  interfaceGroupSel,
  interfaceGroupSelById,
  interfaceGroupSelByIds,
  interfaceGroupSelAll,
  interfaceGroupIns,
  interfaceGroupUpd,
  interfaceGroupInss,
  interfaceGroupUpds,
  interfaceGroupDel,
} from "@/api/module/sysManage/interfaceGroup.ts"
import InterfaceGroupCard from "./interfaceGroupCard.vue";

const interfaceState = reactive<State<interfaceDto>>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   parentId: final.DEFAULT_PARENT_ID,
  //   orderNum: final.DEFAULT_ORDER_NUM,
  //   ...
  // }
  dialogForm: {
    id: -1,
    label: '',
    icon: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    ifDisabled: final.N,
    ifPublic: '',
    perms: '',
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    label: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
    ifDisabled: [{required: true, trigger: 'change'}],
    ifPublic: [{required: true, trigger: 'change'}],
    perms: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: '接口名',
    icon: '图标',
    ifPublic: '是否公共接口',
    perms: '权限标识',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {},
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const interfaceState2 = reactive({
  orderNum: 0
})
const interfaceDialogFormRef = ref(null)
const interfaceDialogFormsRef = ref(null)
const interfaceFilterFormRef = ref(null)
const interfaceDialogVisible = ref(false)
const interfaceDialogLoadingRef = ref(false)
const interfaceTableLoadingRef = ref(false)
const interfaceSwitchLoadingRef = ref(false)
const interfaceActiveTabName = ref<ONE | MORE>(final.one)
const interfaceConfig: t_config = reactive({
  selectParam: {}, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
  pageQuery: true, // 分页，默认true
  watchDialogVisible: true, // 监听dialogVisible变化，默认true
  /**
   * dialogVisible变化时的回调，可不传
   * @param visible 变化后的值
   */
  dialogVisibleCallback: (visible: boolean) => {
  },
  /**
   * selectList回调，可不传
   */
  selectListCallback: () => {
  },
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
  /**
   * 修改单个前的查询的回调，可不传，one2More为true时调这个
   */
  beforeUpdateOneCallback1: (res: any[]) => {
  },
  /**
   * 修改单个前的查询的回调，可不传，one2More为false时调这个
   */
  beforeUpdateOneCallback2: (res: any) => {
  }
})

const interfaceFunc: t_FuncMap = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: any) => {
    return interfaceSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: any) => {
    return interfaceSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return interfaceSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return interfaceSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return interfaceIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return interfaceUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    return interfaceInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    return interfaceUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return interfaceDel(ids)
  }
}

// const {
//   refresh,
//   dCan,
//   dCon,
//   fEnter,
//   fCon,
//   fCan,
//   gRefresh,
//   gIns,
//   gUpd,
//   gDel,
//   gExport,
//   gImport,
//   tUpd,
//   tDel,
//   handleSelectionChange,
//   pageChange,
//   dfIns,
//   dfDel,
//   ifRequired
// } = funcTablePage({
//   config: interfaceConfig,
//   state: interfaceState,
//   state2: interfaceState2,
//   dialogFormRef: interfaceDialogFormRef,
//   dialogFormsRef: interfaceDialogFormsRef,
//   filterFormRef: interfaceFilterFormRef,
//   dialogVisible: interfaceDialogVisible,
//   dialogLoadingRef: interfaceDialogLoadingRef,
//   tableLoadingRef: interfaceTableLoadingRef,
//   switchLoadingRef: interfaceSwitchLoadingRef,
//   activeTabName: interfaceActiveTabName,
//   func: interfaceFunc
// })

const interfaceGroupState = reactive<State<interfaceGroupDto>>({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   parentId: final.DEFAULT_PARENT_ID,
  //   orderNum: final.DEFAULT_ORDER_NUM,
  //   ...
  // }
  dialogForm: {
    id: -1,
    label: '',
    parentId: final.DEFAULT_PARENT_ID,
    orderNum: final.DEFAULT_ORDER_NUM,
    remark: '',
  },
  dialogForms: [],
  dialogForms_error: {},
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    label: [{required: true, trigger: 'change'}],
    parentId: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    label: '接口组名',
    parentId: '父级接口组',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {},
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const interfaceGroupState2 = reactive({
  orderNum: 0
})
const interfaceGroupDialogFormRef = ref<FormInstance | null>(null)
const interfaceGroupDialogFormsRef = ref(null)
const interfaceGroupFilterFormRef = ref(null)
const interfaceGroupDialogVisible = ref(false)
const interfaceGroupDialogLoadingRef = ref(false)
const interfaceGroupTableLoadingRef = ref(false)
const interfaceGroupSwitchLoadingRef = ref(false)
const interfaceGroupActiveTabName = ref<ONE | MORE>(final.one)
const interfaceGroupConfig: t_config = reactive({
  selectParam: {}, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
  pageQuery: true, // 分页，默认true
  watchDialogVisible: true, // 监听dialogVisible变化，默认true
  /**
   * dialogVisible变化时的回调，可不传
   * @param visible 变化后的值
   */
  dialogVisibleCallback: (visible: boolean) => {
  },
  /**
   * selectList回调，可不传
   */
  selectListCallback: () => {
  },
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
  /**
   * 修改单个前的查询的回调，可不传，one2More为true时调这个
   */
  beforeUpdateOneCallback1: (res: any[]) => {
  },
  /**
   * 修改单个前的查询的回调，可不传，one2More为false时调这个
   */
  beforeUpdateOneCallback2: (res: any) => {
  }
})

const interfaceGroupFunc: t_FuncMap = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params: any) => {
    return interfaceGroupSel(params)
  },
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params: any) => {
    return interfaceGroupSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return interfaceGroupSelById(id)
  },
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids: any[]) => {
    return interfaceGroupSelByIds(ids)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return interfaceGroupIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return interfaceGroupUpd(obj)
  },
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs: any[]) => {
    return interfaceGroupInss(objs)
  },
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs: any[]) => {
    return interfaceGroupUpds(objs)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return interfaceGroupDel(ids)
  }
}

// const {
//   refresh,
//   dCan,
//   dCon,
//   fEnter,
//   fCon,
//   fCan,
//   gRefresh,
//   gIns,
//   gUpd,
//   gDel,
//   gExport,
//   gImport,
//   tUpd,
//   tDel,
//   handleSelectionChange,
//   pageChange,
//   dfIns,
//   dfDel,
//   ifRequired
// } = funcTablePage({
//   config: interfaceGroupConfig,
//   state: interfaceGroupState,
//   state2: interfaceGroupState2,
//   dialogFormRef: interfaceGroupDialogFormRef,
//   dialogFormsRef: interfaceGroupDialogFormsRef,
//   filterFormRef: interfaceGroupFilterFormRef,
//   dialogVisible: interfaceGroupDialogVisible,
//   dialogLoadingRef: interfaceGroupDialogLoadingRef,
//   tableLoadingRef: interfaceGroupTableLoadingRef,
//   switchLoadingRef: interfaceGroupSwitchLoadingRef,
//   activeTabName: interfaceGroupActiveTabName,
//   func: interfaceGroupFunc
// })

const interfaceGroupGetInfo = () => {
  interfaceGroupFunc.selectList({...interfaceGroupState.filterForm, ...interfaceGroupState.pageParam}).then(res => {
    interfaceGroupState.list = res.list
    interfaceGroupState.total = res.total
  })
}
interfaceGroupGetInfo()
const addInterfaceGroupModelVisible = ref(false)
const beforeAddInterfaceGroup = () => {
  if (interfaceGroupDialogFormRef) {
    interfaceGroupDialogFormRef.value?.resetFields()
  }
  interfaceGroupState.dialogType.value = final.ins
  interfaceGroupState.dialogType.label = '创建接口组'
  addInterfaceGroupModelVisible.value = true
}
const editInterfaceGroup = (row: interfaceGroupDto) => {
  Object.keys(interfaceGroupState.dialogForm).forEach(key => {
    interfaceGroupState.dialogForm[key] = row[key]
  })
  interfaceGroupState.dialogType.value = final.upd
  interfaceGroupState.dialogType.label = '编辑接口组'
  addInterfaceGroupModelVisible.value = true
}
const closeAddInterfaceGroupModel = () => {
  addInterfaceGroupModelVisible.value = false
}
const addInterfaceGroupModel = () => {
  if (interfaceGroupDialogFormRef.value) {
    interfaceGroupDialogFormRef.value.validate((valid, fields) => {
      if (valid) {
        if (interfaceGroupState.dialogType.value === final.ins) {
          interfaceGroupFunc.insertOne(interfaceGroupState.dialogForm).then(res => {
            if (res) {
              ElMessage.success('创建成功。')
              addInterfaceGroupModelVisible.value = false
              interfaceGroupGetInfo()
            }
          })
        } else if (interfaceGroupState.dialogType.value === final.upd) {
          interfaceGroupFunc.updateOne(interfaceGroupState.dialogForm).then(res => {
            if (res) {
              ElMessage.success('编辑成功。')
              addInterfaceGroupModelVisible.value = false
              interfaceGroupGetInfo()
            }
          })
        }
      } else {
        if (fields) {
          const arr: string[] = []
          Object.keys(fields).forEach(item => arr.push(interfaceGroupState.dict[item]))
          ElMessage.warning(`${arr.join('、')}不能为空。`)
        }
      }
    })
  }
}
</script>

<template>
  <div class="el">
    <header>
      <el-button type="info" plain @click="interfaceGroupGetInfo">刷新接口组</el-button>
    </header>
    <el-main>
      <div class="interface-groups-container">
        <div class="add" @click="beforeAddInterfaceGroup">
          <SvgIcon name="add-one" color="#57606f" :size="36"/>
          <p>{{ interfaceGroupState.dialogType.label }}</p>
        </div>
        <InterfaceGroupCard
            v-for="item in interfaceGroupState.list"
            :key="item.id"
            :interface-group="item"
            @edit-interface-group="editInterfaceGroup"
        />
      </div>
    </el-main>

    <div class="model-box" :class="addInterfaceGroupModelVisible ? '' : 'model-box-close'">
      <header>
        <el-space>
          <SvgIcon name="arrow-left" color="#57606f" :size="24" @click="closeAddInterfaceGroupModel"
                   style="cursor: pointer;"/>
          <span>创建接口组</span>
        </el-space>
      </header>
      <main>
        <el-form
            ref="interfaceGroupDialogFormRef"
            v-loading="interfaceGroupDialogLoadingRef"
            :model="interfaceGroupState.dialogForm"
            :rules="interfaceGroupState.dFormRules"
            label-position="top"
        >
          <el-form-item :label="interfaceGroupState.dict['label']" prop="label">
            <el-input v-model="interfaceGroupState.dialogForm['label']"
                      :placeholder="interfaceGroupState.dict['label']"/>
          </el-form-item>
          <el-form-item :label="interfaceGroupState.dict['orderNum']" prop="orderNum">
            <el-input-number v-model="interfaceGroupState.dialogForm['orderNum']"/>
          </el-form-item>
          <el-form-item :label="interfaceGroupState.dict['remark']" prop="remark">
            <el-input type="textarea" v-model="interfaceGroupState.dialogForm['remark']"
                      :placeholder="interfaceGroupState.dict['remark']" :rows="3"/>
          </el-form-item>
          <div>
            <el-button :color="CONFIG.theme_color_menu_bg_active" style="color: #fff;" @click="addInterfaceGroupModel">
              完成
            </el-button>
            <el-button type="info" plain @click="closeAddInterfaceGroupModel">取消</el-button>
          </div>
        </el-form>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el {
  position: relative;
  height: 100%;

  > header {
    padding-top: 8px;
    padding-left: 20px;
  }

  > .model-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .2s;
    background-color: #fff;

    &.model-box-close {
      width: 80%;
      left: 20%;
      opacity: 0;
      pointer-events: none;
    }

    > header {
      margin-bottom: 16px;
    }
  }
}

.interface-groups-container {
  display: flex;
  gap: 16px;

  > * {
    width: 360px;
    height: 200px;
    border: 1px solid #57606f;
    border-radius: 8px;
    cursor: pointer;
    transition: all .2s;

    &.add {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      color: #57606f;
    }

    &:hover {
      //box-shadow: 0 0 10px 3px #dfe4ea;
      box-shadow: /* 内部阴影，增加深度感 */
          inset 0 1px 2px rgba(0, 0, 0, 0.1),
            /* 主要阴影 */
          0 2px 6px rgba(0, 0, 0, 0.2),
            /* 边缘柔和阴影 */
          0 4px 12px rgba(0, 0, 0, 0.1),
            /* 上方细长阴影，模拟光线 */
          0 6px 16px rgba(0, 0, 0, 0.05),
            /* 边缘扩散阴影，增加层次感 */
          0 8px 20px rgba(0, 0, 0, 0.03);
    }
  }
}
</style>
