<script setup lang="ts">

const props = defineProps(['pageNum', 'pageSize', 'total']);
const emits = defineEmits(['pageChange']);

const handleSizeChange = (val: number) => {
  const obj = {
    pageNum: props.pageNum,
    pageSize: val
  };
  if ((props.pageNum - 1) * val > props.total) {
    obj.pageNum = Math.floor(props.total / props.pageSize)
  }
  emits('pageChange', obj);
};
const handleCurrentChange = (val: number) => {
  const obj = {
    pageNum: val,
    pageSize: props.pageSize
  };
  emits('pageChange', obj);
}
</script>

<template>
  <el-pagination
      class="my-pagination"
      :current-page="props.pageNum"
      :page-size="props.pageSize"
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