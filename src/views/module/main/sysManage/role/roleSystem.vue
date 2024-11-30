<script setup lang="ts">
import { reactive, ref } from "vue";
import { CONFIG, final } from "@/utils/base.ts";
import Pagination from "@/components/pagination/pagination.vue";
import { funcTablePage } from "@/composition/tablePage/tablePage2.ts";
import { State2, TablePageConfig } from "@/type/tablePage.ts";
import { FormRules } from "element-plus";
import { Delete, Download, Edit, Plus, Refresh, Upload, Search } from "@element-plus/icons-vue";
import { SysDto, SysUpdDto } from "@/type/module/main/sysManage/sys.ts";
import { sysApi } from "@/api/module/main/sysManage/sys.ts";
import { sysDict } from "@/dict/module/main/sysManage/sys.ts";
import { RoleDto } from "@/type/module/main/sysManage/role.ts";
import { roleSysApi } from "@/api/module/main/sysManage/roleSys.ts";
import { RoleSysDto } from "@/type/module/main/sysManage/roleSys.ts";
import { roleDict } from "@/dict/module/main/sysManage/role.ts";

const props = defineProps({
  selectRole: {
    type: RoleDto,
    required: true
  }
})

const state = reactive<State2<SysDto, SysUpdDto>>({
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
  filterForm: {},
})
const dFormRules: FormRules = {
  name: [{required: true, trigger: 'change'}],
  perms: [{required: true, trigger: 'change'}],
  orderNum: [{required: true, trigger: 'change'}],
  path: [{required: true, trigger: 'change'}],
  ifDisabled: [{required: true, trigger: 'change'}],
}
const config = new TablePageConfig({
  bulkOperation: true,
  pageQuery: false,
  selectListCallback: () => {
    getRoleSyss()
  }
})

const {
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
  tUpd,
  tDel,
  handleSelectionChange,
  pageChange,
  dfIns,
  dfDel,
  ifRequired,
} = funcTablePage<SysDto, SysUpdDto>({
  state,
  dFormRules,
  config,
  api: sysApi,
  dict: sysDict,
})

class SysDto2 extends SysDto {
  ifTrue!: boolean
  loading!: boolean
}

const allRoleSyss = ref<RoleSysDto[]>([])
const stateList2 = ref<SysDto2[]>([])
const getRoleSyss = () => {
  stateList2.value = tableData.value.map(item => ({...item, ifTrue: false, loading: true}))
  roleSysApi.selectAll({roleId: props.selectRole.id}).then((res: RoleSysDto[]) => {
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
const beforeChange = (dto: SysDto2): boolean | Promise<boolean> => {
  dto.loading = true
  if (!dto.ifTrue) {
    return new Promise((resolve, reject) => {
      roleSysApi.insertOne({roleId: props.selectRole.id, sysId: dto.id}).then(res => {
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
      const find = allRoleSyss.value.find(item => item.roleId === props.selectRole.id && item.sysId === dto.id);
      if (find) {
        roleSysApi.deleteList(find.id).then(res => {
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
        <el-form-item :label="roleDict.label">
          {{ props.selectRole.label }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="roleDict.ifAdmin">
          {{ props.selectRole.ifAdmin }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!--系统列表-->
  <el-divider content-position="left">
    <el-text size="large" style="font-weight: bold;">系统列表</el-text>
  </el-divider>
  <!--操作按钮-->
  <div class="zs-button-row">
    <div>
      <el-button type="primary" plain :icon="Refresh" @click="gRefresh">刷新</el-button>
      <!--<el-button type="primary" plain :icon="Plus" @click="gIns">新增</el-button>-->
      <!--<el-button type="success" plain :icon="Edit" :disabled="config.bulkOperation?multipleSelection.length===0:multipleSelection.length!==1" @click="gUpd">修改</el-button>-->
      <!--<el-button type="danger" plain :icon="Delete" :disabled="multipleSelection.length===0" @click="gDel()">删除</el-button>-->
      <!--<el-button type="warning" plain :icon="Download" :disabled="multipleSelection.length===0" @click="gExport()">导出</el-button>-->
      <!--<el-button type="warning" plain :icon="Upload" @click="gImport">上传</el-button>-->
    </div>
    <div>
      <el-button v-if="filterFormVisible1" plain :icon="Search" circle @click="gChangeFilterFormVisible"/>
    </div>
  </div>

  <br/>

  <div style="display: grid;grid-template-columns: repeat(4, 1fr);gap: 12px;">
    <el-card
        v-for="item in stateList2"
        :key="item.id"
    >
      <el-row align="middle">
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