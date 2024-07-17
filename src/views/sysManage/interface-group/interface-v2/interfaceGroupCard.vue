<script setup lang="ts">
import { interfaceGroupDto } from "@/type/api/sysManage/interfaceGroup.ts";

const props = defineProps({
  interfaceGroup: {
    type: interfaceGroupDto,
    required: true
  }
})
const emits = defineEmits(['editInterfaceGroup'])

const editInterfaceGroup = () => {
  emits('editInterfaceGroup', props.interfaceGroup)
}
</script>

<template>
  <div class="el">
    <SvgIcon class="setting" name="setting-one" color="#000" :size="24" @click="editInterfaceGroup"/>
    <div class="label">{{ props.interfaceGroup.label }}</div>
    <div class="remark">{{ props.interfaceGroup.remark }}</div>
    <footer class="footer1"></footer>
    <footer class="footer2"></footer>
  </div>
</template>

<style scoped lang="scss">
.el {
  position: relative;

  > .setting {
    position: absolute !important;
    right: 10px;
    top: 10px;
  }

  > .label {
    font-size: 20px;
    margin-left: 16px;
    margin-top: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > .remark {
    margin-left: 16px;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
