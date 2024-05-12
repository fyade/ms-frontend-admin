<script setup lang="ts">
import { reactive, ref } from "vue";
import ChooseTable from "@/views/sysUtil/codeGeneration/chooseTable.vue";
import FieldConfig from "@/views/sysUtil/codeGeneration/fieldConfig.vue";
import { chooseTableTableIntre } from "@/type/api/sysUtil/codeGeneration.ts";
import InterfaceConfig from "@/views/sysUtil/codeGeneration/interfaceConfig.vue";
import FileConfig from "@/views/sysUtil/codeGeneration/fileConfig.vue";
import Generation from "@/views/sysUtil/codeGeneration/generation.vue";

const active = ref(0)
const state = reactive({
  table: {} as chooseTableTableIntre
})
const setActive = (index: number) => {
  active.value = index
}
const emitTable = (table: any) => {
  state.table = table
  setActive(1)
}
</script>

<template>
  <div class="el">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step style="cursor:pointer;" title="表信息" @click="setActive(0)"/>
      <el-step style="cursor:pointer;" title="字段信息" @click="setActive(1)"/>
      <el-step style="cursor:pointer;" title="接口信息" @click="setActive(2)"/>
      <el-step style="cursor:pointer;" title="文件地址" @click="setActive(3)"/>
      <el-step style="cursor:pointer;" title="生成" @click="setActive(4)"/>
    </el-steps>

    <el-divider/>

    <div>
      <ChooseTable v-if="active===0" @emit-table="emitTable"/>
      <FieldConfig v-if="active===1" :table="state.table"/>
      <InterfaceConfig v-if="active===2"/>
      <FileConfig v-if="active===3"/>
      <Generation v-if="active===4"/>
    </div>
  </div>
</template>

<style scoped>
.el {
  display: flex;
  flex-direction: column;
  height: 100%;

  > div:last-child {
    flex: auto;
    overflow: auto;
  }
}
</style>