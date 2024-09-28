<script lang="ts">
export default {
  name: 'sysManage:interface'
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
import { interfaceDto, interfaceUpdDto } from "@/type/api/sysManage/interface.ts";
import { interfaceFunc } from "@/api/module/sysManage/interface.ts"
import InterfaceInterfaceGroup from "@/views/sysManage/interface/interfaceInterfaceGroup.vue";
import {
  interfaceInterfaceGroupSelAll,
  interfaceInterfaceGroupUpdIIG
} from "@/api/module/sysManage/interfaceInterfaceGroup.ts";

const state = reactive<State<interfaceDto, interfaceUpdDto>>({
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
    ifPublic: final.N,
    perms: '',
    url: '',
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
    url: [{required: true, trigger: 'change'}],
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
    url: '请求url',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    label: '',
    ifDisabled: '',
    ifPublic: '',
    perms: '',
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
  orderNum: 0
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
  func: interfaceFunc
})

const selectInterface = ref<interfaceDto>(new interfaceDto())
const drawer2 = ref(false)
const selectInterfaceGroups = ref<number[]>([])
const manageInterfaceGroup = (row: interfaceDto) => {
  selectInterface.value = row
  interfaceInterfaceGroupSelAll({interfaceId: selectInterface.value.id}).then(res => {
    selectInterfaceGroups.value = res.map(item => item.interfaceGroupId)
    drawer2.value = true
  })
}
const drawerConfirmInterfaceInterfaceGroup = () => {
  const param = {
    interfaceId: selectInterface.value.id,
    interfaceGroupId: selectInterfaceGroups.value
  }
  interfaceInterfaceGroupUpdIIG(param).then(res => {
    if (res) {
      drawer2.value = false
      gRefresh()
    }
  })
}
const drawerCancelInterfaceInterfaceGroup = () => {
  drawer2.value = false
}
provide('changeSelectInterfaceGroup', selectInterfaceGroups)
</script>

<template>
  <!--接口接口组-->
  <el-dialog
      v-model="drawer2"
      :width="CONFIG.dialog_width_wider"
      draggable
      append-to-body
      destroy-on-close
      title="分配接口组"
  >
    <InterfaceInterfaceGroup
        :interface="selectInterface"
    />
    <template #footer>
      <el-button plain @click="drawerCancelInterfaceInterfaceGroup">取消</el-button>
      <el-button type="primary" plain @click="drawerConfirmInterfaceInterfaceGroup">提交</el-button>
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
        <!--<el-row>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--  <el-col :span="12"></el-col>-->
        <!--</el-row>-->
        <el-form-item v-if="state.dialogType.value!==final.ins" :label="state.dict['id']" prop="id">
          <span>{{ state.dialogForm['id'] }}</span>
        </el-form-item>
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
            <el-form-item :label="state.dict['icon']" prop="icon">
              <!--<el-input v-model="state.dialogForm['icon']" :placeholder="state.dict['icon']"/>-->
              <IconSelect v-model="state.dialogForm['icon']" :placeholder="state.dict['icon']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="state.dict['orderNum']" prop="orderNum">
              <el-input-number v-model="state.dialogForm['orderNum']" controls-position="right"/>
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
          <el-col :span="12">
            <el-form-item :label="state.dict['ifPublic']" prop="ifPublic">
              <el-radio-group v-model="state.dialogForm['ifPublic']">
                <el-radio :value="final.Y">是</el-radio>
                <el-radio :value="final.N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="state.dict['perms']" prop="perms">
              <el-input v-model="state.dialogForm['perms']" :placeholder="state.dict['perms']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="state.dict['url']" prop="url">
              <el-input v-model="state.dialogForm['url']" :placeholder="state.dict['url']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="state.dict['remark']" prop="remark">
              <el-input v-model="state.dialogForm['remark']" :placeholder="state.dict['remark']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--在此上方添加表单项-->
        <!--<el-form-item :label="state.dict['orderNum']" prop='orderNum'>-->
        <!--  <el-input-number v-model="state.dialogForm['orderNum']" controls-position="right"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['ifDefault']" prop='ifDefault'>-->
        <!--  <el-switch v-model="state.dialogForm['ifDefault']" :active-value='final.Y' :inactive-value='final.N'/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['ifDisabled']" prop='ifDisabled'>-->
        <!--  <el-radio-group v-model="state.dialogForm['ifDisabled']">-->
        <!--    <el-radio :value="final.Y">是</el-radio>-->
        <!--    <el-radio :value="final.N">否</el-radio>-->
        <!--  </el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">-->
        <!--  <el-switch v-model="state.dialogForm['ifDisabled']" :active-value="final.N" :inactive-value="final.Y"/>-->
        <!--</el-form-item>-->
        <!--上方几个酌情使用-->
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
          <el-table-column prop="icon" :label="state.dict['icon']" width="300">
            <template #header>
              <span :class="ifRequired('icon')?'tp-table-header-required':''">{{ state.dict['icon'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-icon`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <!--<el-input v-model="state.dialogForms[$index]['icon']" :placeholder="state.dict['icon']"/>-->
                <IconSelect v-model="state.dialogForms[$index]['icon']" :placeholder="state.dict['icon']"/>
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
          <el-table-column prop="ifDisabled" :label="state.dict['ifDisabled']" width="70">
            <template #header>
              <span :class="ifRequired('ifDisabled')?'tp-table-header-required':''">{{
                  state.dict['ifDisabled']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-ifDisabled`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index]['ifDisabled']" :true-value="final.Y"
                             :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifPublic" :label="state.dict['ifPublic']" width="70">
            <template #header>
              <span :class="ifRequired('ifPublic')?'tp-table-header-required':''">{{ state.dict['ifPublic'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifPublic`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-checkbox v-model="state.dialogForms[$index]['ifPublic']" :true-value="final.Y"
                             :false-value="final.N"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="perms" :label="state.dict['perms']" width="300">
            <template #header>
              <span :class="ifRequired('perms')?'tp-table-header-required':''">{{ state.dict['perms'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-perms`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['perms']" :placeholder="state.dict['perms']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="url" :label="state.dict['url']" width="300">
            <template #header>
              <span :class="ifRequired('url')?'tp-table-header-required':''">{{ state.dict['url'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-url`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['url']" :placeholder="state.dict['url']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="state.dict['remark']" width="300">
            <template #header>
              <span :class="ifRequired('remark')?'tp-table-header-required':''">{{ state.dict['remark'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-remark`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['remark']" :placeholder="state.dict['remark']"/>
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
    <el-form-item :label="state.dict['ifDisabled']" prop="ifDisabled">
      <!--<el-input v-model="state.filterForm['ifDisabled']" :placeholder="state.dict['ifDisabled']"/>-->
      <el-select v-model="state.filterForm['ifDisabled']" :placeholder="state.dict['ifDisabled']" clearable filterable>
        <el-option label="是" :value="final.Y"/>
        <el-option label="否" :value="final.N"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="state.dict['ifPublic']" prop="ifPublic">
      <!--<el-input v-model="state.filterForm['ifPublic']" :placeholder="state.dict['ifPublic']"/>-->
      <el-select v-model="state.filterForm['ifPublic']" :placeholder="state.dict['ifPublic']" clearable filterable>
        <el-option label="是" :value="final.Y"/>
        <el-option label="否" :value="final.N"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="state.dict['perms']" prop="perms">
      <el-input v-model="state.filterForm['perms']" :placeholder="state.dict['perms']"/>
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
    <el-button type="success" plain :icon="Edit"
               :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1"
               @click="gUpd">修改
    </el-button>
    <el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除
    </el-button>
    <el-button type="warning" plain :icon='Download' :disabled='state.multipleSelection.length===0' @click="gExport()">
      导出
    </el-button>
    <el-button type="warning" plain :icon='Upload' @click="gImport">上传</el-button>
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
    <el-table-column prop="label" :label="state.dict['label']" width="240"/>
    <el-table-column prop="orderNum" :label="state.dict['orderNum']" width="120"/>
    <el-table-column prop="ifDisabled" :label="state.dict['ifDisabled']" width="120"/>
    <el-table-column prop="ifPublic" :label="state.dict['ifPublic']" width="120"/>
    <el-table-column prop="perms" :label="state.dict['perms']" width="240"/>
    <el-table-column prop="url" :label="state.dict['url']" width="240"/>
    <el-table-column prop="remark" :label="state.dict['remark']" width="120"/>
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
        <el-button link type="primary" size="small" @click="manageInterfaceGroup(row)">分配接口组</el-button>
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
