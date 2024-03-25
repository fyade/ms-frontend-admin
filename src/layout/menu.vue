<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  parentPath: {
    type: String,
    default: ''
  }
});
const emits = defineEmits(['gotoMenu']);

const menuclick = (item: any) => {
  emits('gotoMenu', item.index || item)
}
</script>

<template>
  <template
      v-for="(item, index) in props.items as any[]"
      :key="index"
  >
    <template v-if="item.children && item.children?.length > 0">
      <el-sub-menu
          :index="`${props.parentPath}/${item.path}`"
      >
        <template #title>
          {{ item.name }}
        </template>
        <Menu
            :items="item.children"
            :parent-path="`${props.parentPath}/${item.path}`"
            @gotoMenu="menuclick"
        ></Menu>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item
          :index="`${props.parentPath}/${item.path}`"
          @click="menuclick"
      >
        {{ item.name }}
      </el-menu-item>
    </template>
  </template>
</template>

<style scoped>

</style>