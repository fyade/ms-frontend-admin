<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from "vue"
import { cascaderProps4, CONFIG, final, Operate, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePageFullFeatured.ts"
import { t_config, t_FuncMap } from "@/type/tablePage.ts";
import { ElMessage, ElMessageBox, FormRules } from 'element-plus'
import { Delete, Edit, Plus, Refresh } from "@element-plus/icons-vue";
import {
  rolePermissionDel,
  rolePermissionIns,
  rolePermissionSelAll,
  rolePermissionSelById,
  rolePermissionUpd
} from "@/api/module/sysManage/rolePermission.ts";
import { roleSelAll } from "@/api/module/sysManage/role.ts";
import { menuSel } from "@/api/module/sysManage/menu.ts";
import { arr1GetDiguiRelation, arr2ToDiguiObj } from "@/utils/baseUtils.ts";

const props = defineProps({
  roleId: {
    type: Number,
    required: true
  }
})

const T_MENU = 'm'
const T_INTER = 'i'
const menuTypeDict = {
  [T_MENU]: '菜单',
  [T_INTER]: '接口'
}

const state = reactive({
  dialogType: {
    value: '',
    label: ''
  },
  // 这个是弹出框表单
  // 格式: {
  //   id: '',
  //   ifDefault: final.IS_DEFAULT_YES,
  //   ifDisabled: final.DISABLED_NO,
  //   parentId: final.DEFAULT_PARENT_ID,
  //   ...
  // }
  dialogForm: {
    id: '',
    type: T_MENU,
    roleId: 0,
    permissionId: [] as any[],
    remark: ''
  },
  // 这个是弹出框表单校验
  // 格式: {
  //   name: [{ required: true, trigger: 'change' }],
  //   ...
  // }
  dFormRules: {
    type: [{required: true, trigger: 'change'}],
    roleId: [{required: true, trigger: 'change'}],
    permissionId: [{required: true, trigger: 'change'}]
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    type: '权限类型',
    roleId: '角色',
    permissionId: '权限'
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
const state2 = reactive({
  orderNum: 0
})
const dialogFormRef = ref(null)
const filterFormRef = ref(null)
const dialogVisible = ref(false)
const dialogLoadingRef = ref(false)
const tableLoadingRef = ref(false)
const switchLoadingRef = ref(false)
const config: t_config = reactive({
  selectParam: {
    roleId: props.roleId
  }, // 查询参数（补充
  getDataOnMounted: true, // 页面加载时获取数据，默认true
  pageQuery: false, // 分页，默认true
  watchDialogVisible: true, // 监听dialogVisible变化，默认true
  /**
   * dialogVisible变化时的回调函数，可不传
   * @param visible 变化后的值
   */
  dialogVisibleCallback: (visible?: boolean) => {
    dialogVisibleChange()
  },
  one2More: true,
  one2MoreConfig: {
    oneKey: 'roleId',
    moreKey: 'permissionId'
  },
  /**
   * 修改单个前的查询的回调，可不传，one2More为true时调这个
   */
  beforeUpdateOneCallback1: (res: any[]) => {
    beforeUpdateOne(res)
  }
})

const func: t_FuncMap = {
  /**
   * 查询列表
   * @param params
   */
  selectList: (params: any) => {
    return rolePermissionSelAll(params)
  },
  /**
   * 查询单个
   * @param id
   */
  selectById: (id: any) => {
    return rolePermissionSelById(id)
  },
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj: any) => {
    return rolePermissionIns(obj)
  },
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj: any) => {
    return rolePermissionUpd(obj)
  },
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids: any[]) => {
    return rolePermissionDel(ids)
  }
}

const {
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
} = funcTablePage({
  config,
  state,
  state2,
  dialogFormRef,
  filterFormRef,
  dialogVisible,
  dialogLoadingRef,
  tableLoadingRef,
  switchLoadingRef,
  func,
  props
})

const allRoles = ref<any[]>([])
roleSelAll({id: props.roleId}).then(({res}) => {
  allRoles.value = res.data
})

const allpermissions = ref<any[]>([])
watch(() => state.dialogForm['type'], () => {
  allpermissions.value = []
  if (state.dialogForm['type'] === T_MENU) {
    menuSel().then(({res}) => {
      allpermissions.value = arr1GetDiguiRelation(res.data, {ckey: 'cids'}).map((item: any) => ({children: [], ...item}))
    })
  } else if (state.dialogForm['type'] === T_INTER) {
  }
}, {
  immediate: true
})
const allpermissions2 = computed(() => {
  return arr2ToDiguiObj(allpermissions.value)
})
const allpermissions3 = (id: any) => {
  const findElement = state.list.find((item: any) => item.id === id);
  if (findElement && config.one2MoreConfig?.moreKey && findElement[config.one2MoreConfig?.moreKey]) {
    return arr2ToDiguiObj(allpermissions.value.filter(item => (findElement[config.one2MoreConfig?.moreKey as string] as any[]).indexOf(item.id) > -1))
  } else {
    return []
  }
}
let lastPermissionSelect: any[] = []
const permissionSelectChange = (): void => {
  if (!checked3.value) {
    return
  }
  const val = state.dialogForm[config.one2MoreConfig?.moreKey as string] as any[]
  if (val.length > lastPermissionSelect.length) {
    const zengids = val.filter(item => lastPermissionSelect.indexOf(item) === -1)
    const parentids = zengids.filter(id => allpermissions.value.find(item => item.cids.indexOf(id) > -1))
        .map(id => allpermissions.value.filter(item => item.cids.indexOf(id) > -1))
        .flat()
        .map((item: any) => item.id)
        .filter(item => state.dialogForm[config.one2MoreConfig?.moreKey as string].indexOf(item) === -1)
    state.dialogForm[config.one2MoreConfig?.moreKey as string] = [...state.dialogForm[config.one2MoreConfig?.moreKey as string], ...parentids]
  }
  if (val.length < lastPermissionSelect.length) {
    const deleteids = lastPermissionSelect.filter(item => val.indexOf(item) === -1)
    const chlidids = deleteids.map(id => allpermissions.value.find(item => item.id === id).cids)
        .flat()
        .filter(item => state.dialogForm[config.one2MoreConfig?.moreKey as string].indexOf(item) > -1)
    state.dialogForm[config.one2MoreConfig?.moreKey as string] = (state.dialogForm[config.one2MoreConfig?.moreKey as string] as any[]).filter(item => chlidids.indexOf(item) === -1)
  }
  lastPermissionSelect = state.dialogForm[config.one2MoreConfig?.moreKey as string]
}

const beforeUpdateOne = (data: any[]) => {
  lastPermissionSelect = data[0][config.one2MoreConfig?.moreKey as string]
}
const checked2 = ref(false)
const checked3 = ref(true)
const dialogVisibleChange = () => {
  checked2.value = false
  checked3.value = true
}
const checked2change = () => {
  if (checked2.value) {
    state.dialogForm[config.one2MoreConfig?.moreKey as string] = allpermissions.value.map(item => item.id)
  } else {
    state.dialogForm[config.one2MoreConfig?.moreKey as string] = []
  }
}
</script>

<template>
  <!--弹框-->
  <el-dialog
      :width="CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="state.dialogType.label"
      draggable
      append-to-body
  >
    <el-form
        ref="dialogFormRef"
        v-loading="dialogLoadingRef"
        :model="state.dialogForm"
        :label-width="CONFIG.dialog_form_label_width"
        :rules="state.dFormRules"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item v-if="state.dialogType.value!==final.ins" :label="state.dict['id']" prop="id">
            <span>{{ state.dialogForm['id'] }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!--
      第一个input添加如下属性
      v-focus
      -->
      <!--在此下方添加表单项-->
      <el-row>
        <el-col :span="12">
          <el-form-item :label="state.dict['roleId']" prop="roleId">
            <el-select v-model="state.dialogForm['roleId']" clearable filterable disabled>
              <el-option v-for="item in allRoles" :key="item.id" :label="item.label" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="state.dict['type']" prop="type">
            <el-radio-group v-model="state.dialogForm['type']">
              <el-radio :label="T_MENU">{{ menuTypeDict[T_MENU] }}</el-radio>
              <el-radio :label="T_INTER" disabled>{{ menuTypeDict[T_INTER] }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="state.dict['permissionId']" prop="permissionId">
            <div>
              <el-row>
                <el-col :span="24">
                  <el-checkbox v-model="checked2" label="全选/全不选" size="large" @change="checked2change"/>
                  <el-checkbox v-model="checked3" label="父子联动" size="large"/>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-cascader-panel
                      v-model="state.dialogForm['permissionId']"
                      :options="allpermissions2"
                      :props="cascaderProps4"
                      clearable
                      collapse-tags
                      collapse-tags-tooltip
                      :max-collapse-tags="3"
                      @change="permissionSelectChange"
                  />
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>-->
      <!--  <el-col :span="24">-->
      <!--    <el-form-item :label="state.dict['remark']" prop="remark">-->
      <!--      <el-input type="textarea" v-model="state.dialogForm['remark']" :placeholder="state.dict['remark']"/>-->
      <!--    </el-form-item>-->
      <!--  </el-col>-->
      <!--</el-row>-->
      <!--在此上方添加表单项-->
      <!--<el-form-item :label="state.dict['orderNum']" prop="orderNum">-->
      <!--  <el-input-number v-model="state.dialogForm['orderNum']" controls-position="right"/>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="state.dict['ifDefault']" prop="ifDefault">-->
      <!--  <el-switch v-model="state.dialogForm['ifDefault']" :active-value="final.IS_DEFAULT_YES"-->
      <!--             :inactive-value="final.IS_DEFAULT_NO"/>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">-->
      <!--  <el-switch v-model="state.dialogForm['ifDisabled']" :active-value="final.DISABLED_NO"-->
      <!--             :inactive-value="final.DISABLED_YES"/>-->
      <!--</el-form-item>-->
      <!--上方几个酌情使用-->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dCan">取消</el-button>
        <el-button type="primary" @click="dCon">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--顶部筛选表单-->
  <el-form
      class="demo-form-inline"
      v-if="Object.keys(state.filterForm).length>0"
      ref="filterFormRef"
      :model="state.filterForm"
      :inline="true"
      @keyup.enter="fEnter"
  >
    <!--在此下方添加表单项-->
    <!--<el-form-item :label="state.dict['']" prop="">-->
    <!--  <el-input v-model="state.filterForm['']" :placeholder="state.dict['']"/>-->
    <!--</el-form-item>-->
    <!--在此上方添加表单项-->
    <el-form-item>
      <el-button type="primary" @click="fCon">筛选</el-button>
      <el-button @click="fCan">重置</el-button>
    </el-form-item>
  </el-form>

  <!--操作按钮-->
  <div>
    <!--<el-button-group>-->
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
      <el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>
      <el-button type="success" plain :icon="Edit" :disabled="state.multipleSelection.length!==1" @click="gUpd">修改
      </el-button>
      <!--<el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除-->
      <!--</el-button>-->
      <!--<el-button type="warning" plain :icon="Download" :disabled="state.multipleSelection.length===0">导出</el-button>-->
      <!--<el-button type="warning" plain :icon="Upload">上传</el-button>-->
    <!--</el-button-group>-->
    <!--<el-button-group>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveUp">上移</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gMoveDown">下移</el-button>-->
    <!--</el-button-group>-->
    <!--<el-button-group>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToNo">启用</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledToYes">禁用</el-button>-->
    <!--  <el-button plain :disabled="state.multipleSelection.length===0" @click="gDisabledShift">切换</el-button>-->
    <!--</el-button-group>-->
  </div>

  <!--数据表格-->
  <el-table
      v-loading="tableLoadingRef"
      :data="state.list"
      @selection-change="handleSelectionChange"
  >
    <el-table-column fixed type="selection" width="55"/>
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width="180"/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="roleId" :label="state.dict['roleId']" width="120">
      <template #default="{row}">
        {{ row.role.label }}
      </template>
    </el-table-column>
    <el-table-column prop="type" :label="state.dict['type']" width="120">
      <template #default="{row}">
        <template v-if="row.type==='m'">菜单</template>
        <template v-if="row.type==='i'">接口</template>
      </template>
    </el-table-column>
    <el-table-column prop="permissionId" :label="state.dict['permissionId']" min-width="120">
      <template #default="{row}">
        <el-tree
            :data="allpermissions3(row.id)"
            accordion
            default-expand-all
        />
      </template>
    </el-table-column>
    <!--<el-table-column prop="remark" :label="state.dict['remark']" width="200"/>-->
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="state.dict['createBy']" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="state.dict['updateBy']" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="state.dict['createTime']" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="state.dict['updateTime']" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="tUpd(row.roleId)">修改</el-button>
        <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #append>
      <span>此表格的多选<span
          class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>
    </template>
  </el-table>

  <!--分页-->
  <Pagination
      v-if="state.total!==-1"
      :total="Number(state.total)"
      :page-num="state.pageParam.pageNum"
      :page-size="state.pageParam.pageSize"
      @page-change="pageChange"
  />
</template>

<style scoped>

</style>