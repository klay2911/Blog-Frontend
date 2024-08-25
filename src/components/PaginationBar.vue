<template>
  <div class="pagination-bar">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span v-for="page in pageCount" :key="page">
      <button @click="goToPage(page)" :disabled="currentPage === page">{{ page }}</button>
    </span>
    <button @click="nextPage" :disabled="currentPage === pageCount">Next</button>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'pageCount', 'prevPage', 'nextPage', 'goToPage']
}
</script>

<style scoped>
.pagination-bar {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}
</style>
