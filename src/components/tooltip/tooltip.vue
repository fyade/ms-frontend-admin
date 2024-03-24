<script setup lang="ts">
import { QuestionFilled } from "@element-plus/icons-vue";

let props = defineProps({
  content: {
    type: String,
    required: true
  },
  placement: {
    type: String,
    default: 'top'
  }
});
</script>

<template>
  <el-tooltip
      :content="props.content"
      :placement="props.placement"
  >
    <div class="el">
      <el-icon>
        <QuestionFilled/>
      </el-icon>
      <slot></slot>
    </div>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.el {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>