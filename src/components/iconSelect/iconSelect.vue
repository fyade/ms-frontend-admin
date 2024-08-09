<script setup lang="ts">
import { ref } from "vue";
import { getFilenameWithoutSuffix } from "@/utils/RegularUtils.ts";
import iconEnCn from './iconEnCn.json'
import { CONFIG } from "@/utils/base.ts";

const modelValue = defineModel()
const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  }
})

interface iconI {
  url: string
  name: string
  label: string
  value: string
}

const icons = ref<iconI[]>([])
const files = import.meta.glob('/src/assets/icon/*.svg');
icons.value = Object.keys(files).map((path) => {
  const module = files[path];
  const fileName = path!.split('/')!.pop() as string; // 提取文件名部分
  const filenameWithoutSuffix = getFilenameWithoutSuffix(fileName);
  return {
    url: (module as unknown as { default: string }).default, // 图片相对路径（/public/icon/DNS服务.svg）
    name: fileName, // 文件名(带后缀)
    label: Object.keys(iconEnCn).includes(filenameWithoutSuffix) ? `${(iconEnCn as IconEnCn)[filenameWithoutSuffix as string]}_${filenameWithoutSuffix}` : filenameWithoutSuffix,
    value: filenameWithoutSuffix,
  };
})

// const encn = icons.value.reduce((obj, item) => ({...obj, [item.value]: item.value2}), {})
// console.info(encn)
</script>

<template>
  <el-select-v2
      popper-class="popperClass"
      v-model="modelValue"
      :placeholder="props.placeholder"
      :options="icons"
      filterable
      clearable
  >
    <template #default="{item}">
      <div>
        <el-space>
          <SvgIcon :name="item.value" :color="CONFIG.icon_black"/>
          <span>{{ item.label }}</span>
        </el-space>
      </div>
    </template>
    <template #footer>
      <el-tag type="info" effect="plain">当前系统图标库中共有{{ icons.length }}个图标。</el-tag>
    </template>
  </el-select-v2>
</template>

<style scoped lang="scss">
</style>