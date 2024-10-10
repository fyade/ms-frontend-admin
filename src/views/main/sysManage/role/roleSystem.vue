<script setup lang="ts">
import { roleDto } from "@/type/module/main/sysManage/role.ts";
import { computed, reactive, ref } from "vue";
import { CONFIG, final, PAGINATION, publicDict } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage.ts";
import { State, t_config } from "@/type/tablePage.ts";
import type { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload } from "@element-plus/icons-vue";
import { typeOM } from "@/type/utils/base.ts";
import { sysDto, sysUpdDto } from "@/type/module/main/sysManage/sys.ts";
import { sysFunc } from "@/api/module/main/sysManage/sys.ts";
import { roleSysFunc } from "@/api/module/main/sysManage/roleSys.ts";
import { roleSysDto } from "@/type/module/main/sysManage/roleSys.ts";

const props = defineProps({
  selectRole: {
    type: roleDto,
    required: true
  }
})

const state = reactive<State<sysDto, sysUpdDto>>({
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
    name: '',
    perms: '',
    orderNum: final.DEFAULT_ORDER_NUM,
    path: '',
    ifDisabled: final.N,
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
    name: [{required: true, trigger: 'change'}],
    perms: [{required: true, trigger: 'change'}],
    orderNum: [{required: true, trigger: 'change'}],
    path: [{required: true, trigger: 'change'}],
    ifDisabled: [{required: true, trigger: 'change'}],
  } as FormRules,
  // 字典
  // 格式: {
  //   ...publicDict,
  //   name: '名字',
  //   ...
  // }
  dict: {
    ...publicDict,
    name: '系统名',
    perms: '权限字符',
    path: 'url路径',
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
  pageQuery: false,
  selectListCallback: () => {
    getRoleSyss()
  }
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
  func: sysFunc
})

class sysDto2 extends sysDto {
  ifTrue!: boolean
  loading!: boolean
}

const allRoleSyss = ref<roleSysDto[]>([])
const stateList2 = ref<sysDto2[]>([])
const getRoleSyss = () => {
  stateList2.value = state.list.map(item => ({...item, ifTrue: false, loading: true}))
  roleSysFunc.selectAll({roleId: props.selectRole?.id}).then((res: roleSysDto[]) => {
    allRoleSyss.value = res
    res.forEach(ite => {
      const find = stateList2.value.find(item => item.id === ite.sysId);
      if (find) {
        find.ifTrue = true
      }
    })
    stateList2.value.forEach(item => item.loading = false)
  })
}
const beforeChange = (dto: sysDto2): boolean | Promise<boolean> => {
  dto.loading = true
  if (!dto.ifTrue) {
    return new Promise((resolve, reject) => {
      roleSysFunc.insertOne({roleId: props.selectRole?.id, sysId: dto.id, remark: ''}).then(res => {
        if (res) {
          gRefresh()
          resolve(true)
        } else {
          reject()
        }
      }).finally(() => {
        dto.loading = false
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      const find = allRoleSyss.value.find(item => item.roleId === props.selectRole?.id && item.sysId === dto.id);
      if (find) {
        roleSysFunc.deleteList(find.id).then(res => {
          if (res) {
            gRefresh()
            resolve(true)
          } else {
            reject()
          }
        }).finally(() => {
          dto.loading = false
        })
      } else {
        dto.loading = false
        reject()
      }
    })
  }
}
</script>

<template>
  <!--角色信息-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">角色信息</el-text>
  </el-divider>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item label="角色名">
          <el-input disabled v-model="props.selectRole.label"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否管理员权限">
          <el-input disabled v-model="props.selectRole.ifAdmin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否禁用">
          <el-input disabled v-model="props.selectRole.ifDisabled"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!--系统列表-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">系统列表</el-text>
  </el-divider>
  <!--操作按钮-->
  <div>
    <!--<el-button-group>-->
    <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
    <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
    <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?state.multipleSelection.length===0:state.multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
    <!--<el-button type="danger" plain :icon="Delete" :disabled="state.multipleSelection.length===0" @click="gDel()">删除</el-button>-->
    <!--<el-button type="warning" plain :icon="Download" :disabled="state.multipleSelection.length===0" @click="gExport()">导出</el-button>-->
    <!--<el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>-->
    <!--</el-button-group>-->
  </div>

  <br/>

  <div style="display: grid;grid-template-columns: repeat(4, 1fr);gap: 12px;">
    <el-card
        v-for="item in stateList2"
        :key="item.id"
    >
      <el-row>
        <el-col :span="16">
          {{ item.name }}
        </el-col>
        <el-col :span="8">
          <el-switch
              v-model="item.ifTrue"
              :loading="item.loading"
              :before-change="()=>beforeChange(item)"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

</style>