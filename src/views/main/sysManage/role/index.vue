<script lang="ts">
export default {
  name: 'main:sysManage:role'
}
</script>

<script setup lang="ts">
import { provide, reactive, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.ts"
import { State, t_config } from "@/type/tablePage.ts"
import type { FormRules } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { MORE, ONE, typeOM } from "@/type/utils/base.ts"
import { roleDto, roleUpdDto } from "@/type/api/main/sysManage/role.ts";
import { roleFunc } from "@/api/module/main/sysManage/role.ts"
import {
  rolePermissionSelAll,
  rolePermissionUpd,
  rolePermissionUpdRp
} from "@/api/module/main/sysManage/rolePermission.ts";
import RoleUser from "@/views/main/sysManage/role/roleUser.vue";
import RolePermission from "@/views/main/sysManage/role/rolePermission.vue";
import { rolePermissionDto } from "@/type/api/main/sysManage/rolePermission.ts";
import RoleSystem from "@/views/main/sysManage/role/roleSystem.vue";

const state = reactive<State<roleDto, roleUpdDto>>({
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
    ifAdmin: final.N,
    ifDisabled: final.N,
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
    ifAdmin: [{required: true, trigger: 'change'}],
    ifDisabled: [{required: true, trigger: 'change'}],
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
    label: '角色名',
    ifAdmin: '是否管理员权限',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    label: '',
    ifAdmin: '',
    ifDisabled: ''
  },
  list: [],
  multipleSelection: [],
  total: -1,
  pageParam: {
    pageNum: PAGINATION.pageNum,
    pageSize: PAGINATION.pageSize
  }
})
const state2 = reactive({
  orderNum: final.DEFAULT_ORDER_NUM
})
const dialogFormRef = ref(null)
const dialogFormsRef = ref(null)
const filterFormRef = ref(null)
const dialogVisible = ref(false)
const dialogLoadingRef = ref(false)
const tableLoadingRef = ref(false)
const switchLoadingRef = ref(false)
const activeTabName = ref<typeOM>(final.one)
const config: t_config = reactive({
  bulkOperation: true, // 弹出表单是否支持批量操作，默认false
})

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
  gExport,
  gImport,
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange,
  dfIns,
  dfDel,
  ifRequired
} = funcTablePage({
  config,
  state,
  state2,
  dialogFormRef,
  dialogFormsRef,
  filterFormRef,
  dialogVisible,
  dialogLoadingRef,
  tableLoadingRef,
  switchLoadingRef,
  activeTabName,
  func: roleFunc
})

// 选择的角色信息
let selectRoleInfo: roleDto = new roleDto()
const drawer2 = ref(false)
const selectPermission = ref<number[]>([])
const manageUser = (row: roleDto) => {
  selectRoleInfo = row
  drawer2.value = true
}

// 角色权限
const drawer = ref(false)
const setPermission = (row: roleDto) => {
  selectRoleInfo = row
  rolePermissionSelAll({roleId: selectRoleInfo.id}).then(res => {
    selectPermission.value = res.map(item => item.permissionId)
    drawer.value = true
  })
}
const drawerCancelRolePermission = () => {
  drawer.value = false
}
const drawerConfirmRolePermission = () => {
  const param = {
    roleId: selectRoleInfo.id,
    permissionId: selectPermission.value
  }
  rolePermissionUpdRp(param).then(res => {
    if (res) {
      drawer.value = false
      gRefresh()
    }
  })
}
provide('changeSelectPermission', selectPermission)

// 分配系统
const drawer3 = ref(false)
const setSystem = (row: roleDto) => {
  selectRoleInfo = row
  drawer3.value = true
}
</script>

<template>
  <!--管理用户-->
  <el-dialog
      v-model="drawer2"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      title="管理用户"
      destroy-on-close
  >
    <RoleUser
        :select-role="selectRoleInfo"
    />
    <template #footer>
      <el-button plain @click="drawer2=false">取消</el-button>
    </template>
  </el-dialog>

  <!--分配系统-->
  <el-dialog
      v-model="drawer3"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      title="分配系统"
      destroy-on-close
  >
    <RoleSystem
        :select-role="selectRoleInfo"
    />
    <template #footer>
      <el-button plain @click="drawer3=false">取消</el-button>
    </template>
  </el-dialog>

  <!--角色权限-->
  <el-dialog
      v-model="drawer"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      title="分配权限"
      destroy-on-close
  >
    <RolePermission
        :select-role="selectRoleInfo"
    />
    <template #footer>
      <!--<el-button plain @click="drawer=false">取消</el-button>-->
      <el-button plain @click="drawerCancelRolePermission">取消</el-button>
      <el-button type="primary" plain @click="drawerConfirmRolePermission">提交</el-button>
    </template>
  </el-dialog>

  <!--弹窗-->
  <el-dialog
      :width="activeTabName===final.more ? CONFIG.dialog_width_wider : CONFIG.dialog_width"
      v-model="dialogVisible"
      :title="state.dialogType.label"
      draggable
      append-to-body
  >
    <el-tabs v-if="config.bulkOperation" v-model="activeTabName">
      <el-tab-pane :disabled="state.dialogType.value===final.upd" label="操作单个" :name="final.one"></el-tab-pane>
      <el-tab-pane :disabled="state.dialogType.value===final.upd" label="操作多个" :name="final.more"></el-tab-pane>
    </el-tabs>
    <template v-if="activeTabName===final.one">
    <el-form
        ref="dialogFormRef"
        v-loading="dialogLoadingRef"
        :model="state.dialogForm"
        :label-width="CONFIG.dialog_form_label_width"
        :rules="state.dFormRules"
    >
      <el-row v-if="state.dialogType.value!==final.ins">
        <el-col :span="24">
          <el-form-item :label="state.dict['id']" prop="id">
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
          <el-form-item :label="state.dict['label']" prop="label">
            <el-input v-model="state.dialogForm['label']" :placeholder="state.dict['label']"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="state.dict['orderNum']" prop="orderNum">
            <el-input-number v-model="state.dialogForm['orderNum']" controls-position="right"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="state.dict['ifAdmin']" prop="ifAdmin">
            <el-radio-group v-model="state.dialogForm['ifAdmin']">
              <el-radio :value="final.Y">是</el-radio>
              <el-radio :value="final.N">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">
            <el-radio-group v-model="state.dialogForm['ifDisabled']">
              <el-radio :value="final.Y">是</el-radio>
              <el-radio :value="final.N">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="state.dict['remark']" prop="remark">
            <el-input type="textarea" v-model="state.dialogForm['remark']" :placeholder="state.dict['remark']"/>
          </el-form-item>
        </el-col>
      </el-row>
      <!--在此上方添加表单项-->
    </el-form>
    </template>
    <template v-if="activeTabName===final.more">
      <el-form
          ref="dialogFormsRef"
          v-loading="dialogLoadingRef"
      >
        <el-table
            :data="state.dialogForms"
            v-if="state.dialogForms"
        >
          <el-table-column type="index" width="50">
            <template #header>
              #
            </template>
          </el-table-column>
          <!--在此下方添加表格列-->
          <el-table-column prop="label" :label="state.dict['label']" width="300">
            <template #header>
              <span :class="ifRequired('label')?'tp-table-header-required':''">{{ state.dict['label'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-label`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['label']" :placeholder="state.dict['label']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="300">
            <template #header>
              <span :class="ifRequired('orderNum')?'tp-table-header-required':''">{{ state.dict['orderNum'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-orderNum`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input-number v-model="state.dialogForms[$index]['orderNum']" controls-position="right"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifAdmin" :label="state.dict['ifAdmin']" width="70">
            <template #header>
              <span :class="ifRequired('ifAdmin')?'tp-table-header-required':''">{{ state.dict['ifAdmin'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifAdmin`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index]['ifAdmin']" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifDisabled" :label="state.dict['ifDisabled']" width="70">
            <template #header>
              <span :class="ifRequired('ifDisabled')?'tp-table-header-required':''">{{ state.dict['ifDisabled'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index]['ifDisabled']" :true-value="final.Y" :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="state.dict['remark']" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ state.dict['remark'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input type="textarea" v-model="state.dialogForms[$index]['remark']" :placeholder="state.dict['remark']"/>
              </div>
            </template>
          </el-table-column>
          <!--在此上方添加表格列-->
          <el-table-column fixed="right" label="操作" min-width="120">
            <template v-if="state.dialogType.value===final.ins" #default="{$index}">
              <el-button link type="danger" size="small" @click="dfDel($index)">删除</el-button>
            </template>
          </el-table-column>
          <template v-if="state.dialogType.value===final.ins" #append>
            <el-button text type="primary" plain :icon="Plus" @click="dfIns">新增</el-button>
          </template>
        </el-table>
      </el-form>
    </template>
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
      @submit.prevent
  >
    <!--在此下方添加表单项-->
    <el-form-item :label="state.dict['label']" prop="label">
      <el-input v-model="state.filterForm['label']" :placeholder="state.dict['label']"/>
    </el-form-item>
    <el-form-item :label="state.dict['ifAdmin']" prop="ifAdmin">
      <!--<el-input v-model="state.filterForm['ifAdmin']" :placeholder="state.dict['ifAdmin']"/>-->
      <el-select v-model="state.filterForm['ifAdmin']" :placeholder="state.dict['ifAdmin']" clearable filterable>
        <el-option label="是" :value="final.Y"/>
        <el-option label="否" :value="final.N"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">
      <!--<el-input v-model="state.filterForm['ifDisabled']" :placeholder="state.dict['ifDisabled']"/>-->
      <el-select v-model="state.filterForm['ifDisabled']" :placeholder="state.dict['ifDisabled']" clearable filterable>
        <el-option label="是" :value="final.Y"/>
        <el-option label="否" :value="final.N"/>
      </el-select>
    </el-form-item>
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
    <el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1" @click="gUpd">修改</el-button>
    <el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除</el-button>
    <el-button type="warning" plain :icon="Download" :disabled="state.multipleSelection.length===0" @click="gExport()">导出</el-button>
    <el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>
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
    <el-table-column prop="label" :label="state.dict['label']" width="120"/>
    <el-table-column prop="ifAdmin" :label="state.dict['ifAdmin']" width="120"/>
    <el-table-column prop="ifDisabled" :label="state.dict['ifDisabled']" width="120"/>
    <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="120"/>
    <el-table-column prop="remark" :label="state.dict['remark']" width="200"/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="state.dict['createBy']" width="120"/>-->
    <!--<el-table-column prop="updateBy" :label="state.dict['updateBy']" width="120"/>-->
    <!--<el-table-column prop="createTime" :label="state.dict['createTime']" width="220"/>-->
    <!--<el-table-column prop="updateTime" :label="state.dict['updateTime']" width="220"/>-->
    <!--<el-table-column prop="deleted" :label="state.dict['deleted']" width="60"/>-->
    <!--上方几个酌情使用-->
    <el-table-column fixed="right" label="操作" min-width="200">
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>
        <el-button link type="primary" size="small" @click="manageUser(row)">管理用户</el-button>
        <el-button link type="primary" size="small" @click="setSystem(row)">分配系统</el-button>
        <el-button link type="primary" size="small" @click="setPermission(row)">分配权限</el-button>
        <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>
      </template>
    </el-table-column>
    <template #append>
      <div class="el-table-append-box">
        <span>此表格的多选<span
            class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>
      </div>
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
