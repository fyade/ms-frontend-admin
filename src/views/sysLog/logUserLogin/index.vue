<script lang="ts">
export default {
  name: 'sysLog:logUserLogin'
}
</script>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts"
import Pagination from "@/components/pagination/pagination.vue"
import { funcTablePage } from "@/composition/tablePage/tablePage.ts"
import { State, t_config } from "@/type/tablePage.ts"
import type { FormRules } from 'element-plus'
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { MORE, ONE } from "@/type/utils/base.ts"
import { logUserLoginDto } from "@/type/api/sysLog/logUserLogin.ts";
import { logUserLoginFunc } from "@/api/module/sysLog/logUserLogin.ts"

const state = reactive<State<logUserLoginDto>>({
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
    userId: '',
    loginIp: '',
    loginPosition: '',
    loginBrowser: '',
    loginOs: '',
    ifSuccess: '',
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
    userId: [{required: true, trigger: 'change'}],
    ifSuccess: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    userId: '用户id',
    loginIp: '登录ip',
    loginPosition: '登录地',
    loginBrowser: '登录浏览器',
    loginOs: '登录系统',
    ifSuccess: '是否成功',
  },
  // 筛选表单
  // 格式: {
  //   name: '',
  //   ...
  // }
  filterForm: {
    userId: ''
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
const activeTabName = ref<ONE | MORE>(final.one)
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
  func: logUserLoginFunc
})
</script>

<template>
  <!--弹框-->
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
        <el-form-item :label="state.dict['userId']" prop="userId">
          <el-input v-model="state.dialogForm['userId']" :placeholder="state.dict['userId']"/>
        </el-form-item>
        <el-form-item :label="state.dict['loginIp']" prop="loginIp">
          <el-input v-model="state.dialogForm['loginIp']" :placeholder="state.dict['loginIp']"/>
        </el-form-item>
        <el-form-item :label="state.dict['loginPosition']" prop="loginPosition">
          <el-input v-model="state.dialogForm['loginPosition']" :placeholder="state.dict['loginPosition']"/>
        </el-form-item>
        <el-form-item :label="state.dict['loginBrowser']" prop="loginBrowser">
          <el-input v-model="state.dialogForm['loginBrowser']" :placeholder="state.dict['loginBrowser']"/>
        </el-form-item>
        <el-form-item :label="state.dict['loginOs']" prop="loginOs">
          <el-input v-model="state.dialogForm['loginOs']" :placeholder="state.dict['loginOs']"/>
        </el-form-item>
        <el-form-item :label="state.dict['ifSuccess']" prop="ifSuccess">
          <el-input v-model="state.dialogForm['ifSuccess']" :placeholder="state.dict['ifSuccess']"/>
        </el-form-item>
        <el-form-item :label="state.dict['remark']" prop="remark">
          <el-input v-model="state.dialogForm['remark']" :placeholder="state.dict['remark']"/>
        </el-form-item>
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
          <el-table-column prop="userId" :label="state.dict['userId']" width="300">
            <template #header>
              <span :class="ifRequired('userId')?'tp-table-header-required':''">{{ state.dict['userId'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-userId`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['userId']" :placeholder="state.dict['userId']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="loginIp" :label="state.dict['loginIp']" width="300">
            <template #header>
              <span :class="ifRequired('loginIp')?'tp-table-header-required':''">{{ state.dict['loginIp'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-loginIp`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['loginIp']" :placeholder="state.dict['loginIp']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="loginPosition" :label="state.dict['loginPosition']" width="300">
            <template #header>
              <span :class="ifRequired('loginPosition')?'tp-table-header-required':''">{{
                  state.dict['loginPosition']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-loginPosition`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['loginPosition']"
                          :placeholder="state.dict['loginPosition']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="loginBrowser" :label="state.dict['loginBrowser']" width="300">
            <template #header>
              <span :class="ifRequired('loginBrowser')?'tp-table-header-required':''">{{
                  state.dict['loginBrowser']
                }}</span>
            </template>
            <template #default="{$index}">
              <div
                  :class="state.dialogForms_error?.[`${$index}-loginBrowser`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['loginBrowser']"
                          :placeholder="state.dict['loginBrowser']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="loginOs" :label="state.dict['loginOs']" width="300">
            <template #header>
              <span :class="ifRequired('loginOs')?'tp-table-header-required':''">{{ state.dict['loginOs'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-loginOs`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['loginOs']" :placeholder="state.dict['loginOs']"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ifSuccess" :label="state.dict['ifSuccess']" width="300">
            <template #header>
              <span :class="ifRequired('ifSuccess')?'tp-table-header-required':''">{{ state.dict['ifSuccess'] }}</span>
            </template>
            <template #default="{$index}">
              <div :class="state.dialogForms_error?.[`${$index}-ifSuccess`] ? 'tp-table-cell-bg-red' : 'tp-table-cell'">
                <el-input v-model="state.dialogForms[$index]['ifSuccess']" :placeholder="state.dict['ifSuccess']"/>
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
    <!--<el-form-item :label="state.dict['']" prop="">-->
    <!--  <el-input v-model="state.filterForm['']" :placeholder="state.dict['']"/>-->
    <!--</el-form-item>-->
    <el-form-item :label="state.dict['userId']" prop="userId">
      <el-input v-model="state.filterForm['userId']" :placeholder="state.dict['userId']"/>
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
    <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
    <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
    <!--<el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除</el-button>-->
    <!--<el-button type="warning" plain :icon='Download' :disabled='state.multipleSelection.length===0'>导出</el-button>-->
    <!--<el-button type="warning" plain :icon='Upload'>上传</el-button>-->
    <!--</el-button-group>-->
  </div>

  <!--数据表格-->
  <el-table
      v-loading="tableLoadingRef"
      :data="state.list"
      @selection-change="handleSelectionChange"
  >
    <!--<el-table-column fixed type="selection" width="55"/>-->
    <!--<el-table-column fixed prop="id" :label="state.dict['id']" width='180'/>-->
    <!--上面id列的宽度改一下-->
    <!--在此下方添加表格列-->
    <el-table-column prop="userId" :label="state.dict['userId']" width='120'/>
    <el-table-column prop="loginIp" :label="state.dict['loginIp']" width='200'/>
    <el-table-column prop="loginPosition" :label="state.dict['loginPosition']" width='120'/>
    <el-table-column prop="loginBrowser" :label="state.dict['loginBrowser']" width='200'/>
    <el-table-column prop="loginOs" :label="state.dict['loginOs']" width='200'/>
    <el-table-column prop="ifSuccess" :label="state.dict['ifSuccess']" width='120'>
      <template #default="{row}">
        <el-tag type="success" v-if="row.ifSuccess===final.Y">登录成功</el-tag>
        <el-tag type="danger" v-else>登录失败</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="remark" :label="state.dict['remark']" width='160'/>
    <el-table-column prop="createTime" :label="state.dict['createTime']" width='240'/>
    <!--在此上方添加表格列-->
    <!--<el-table-column prop="createBy" :label="state.dict['createBy']" width='120'/>-->
    <!--<el-table-column prop="updateBy" :label="state.dict['updateBy']" width='120'/>-->
    <!--<el-table-column prop="createTime" :label="state.dict['createTime']" width='220'/>-->
    <!--<el-table-column prop="updateTime" :label="state.dict['updateTime']" width='220'/>-->
    <!--<el-table-column prop="deleted" :label="state.dict['deleted']" width='60'/>-->
    <!--上方几个酌情使用-->
    <!--<el-table-column fixed="right" label="操作" min-width="120">-->
    <!--  <template #default="{row}">-->
    <!--    <el-button link type="primary" size="small" @click="tUpd(row.id)">修改</el-button>-->
    <!--    <el-button link type="danger" size="small" @click="tDel(row.id)">删除</el-button>-->
    <!--  </template>-->
    <!--</el-table-column>-->
    <!--<template #append>-->
    <!--  <div class="el-table-append-box">-->
    <!--    <span>此表格的多选<span class="underline">不支持</span>{{ `跨分页保存，当前已选 ${state.multipleSelection.length} 条数据。` }}</span>-->
    <!--  </div>-->
    <!--</template>-->
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
