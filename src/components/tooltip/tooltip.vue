<script setup lang="ts">
import { QuestionFilled } from "@element-plus/icons-vue";

const props = defineProps({
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
      <slot/>
    </div>
  </el-tooltip>
</template>

<style scoped>
.el {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>