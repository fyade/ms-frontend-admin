<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useStore from '@/store';

const props = defineProps(['pageNum', 'pageSize', 'total']);
const emits = defineEmits(['pageChange']);

const store = useStore();
onMounted(() => {
  pageNumRef.value = props.pageNum;
  pageSizeRef.value = props.pageSize;
});

const pageNumRef = ref(store.page.getPageNum);
const pageSizeRef = ref(store.page.getPageSize);

const handleSizeChange = (val: number) => {
  const obj = {
    pageNum: pageNumRef.value,
    pageSize: val
  };
  store.page.setPageSize(val);
  emits('pageChange');
};
const handleCurrentChange = (val: number) => {
  const obj = {
    pageNum: val,
    pageSize: pageSizeRef.value
  };
  store.page.setPageNum(val);
  emits('pageChange');
}
</script>

<template>
  <el-pagination
      class="my-pagination"
      v-model:current-page="pageNumRef"
      v-model:page-size="pageSizeRef"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>

<style scoped lang="scss">
.my-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>