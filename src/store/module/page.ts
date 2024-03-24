import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { PAGINATION } from '@/utils/base.ts';

export const usePageStore = defineStore('page', () => {
  let pageNumRef = ref(PAGINATION.pageNum);
  let pageSizeRef = ref(PAGINATION.pageSize);

  let getPageNum = computed(() => {
    return pageNumRef.value;
  });
  let getPageSize = computed(() => {
    return pageSizeRef.value;
  });
  let getPage = computed(() => {
    return {
      pageNum: getPageNum.value,
      pageSize: getPageSize.value
    }
  });
  let setPageNum = (num: number) => {
    pageNumRef.value = num;
  }
  let setPageSize = (num: number) => {
    pageSizeRef.value = num;
  }
  let setPage = (obj: {
    pageNum: number
    pageSize: number
  }) => {
    setPageNum(obj.pageNum);
    setPageSize(obj.pageSize);
  }
  let init = () => {
    setPageNum(PAGINATION.pageNum);
    setPageSize(PAGINATION.pageSize);
  }

  return {
    getPageNum,
    getPageSize,
    getPage,
    setPageNum,
    setPageSize,
    setPage,
    init
  }
});
