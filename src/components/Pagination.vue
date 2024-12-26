<template>
  <div class="pagination-container">
    <icon-button @click="handlePageChange(1)" aria-label="First Page">
      <ArrowLeftIcon />
    </icon-button>

    <button
      v-for="(page, index) in pages"
      :key="index"
      :class="['pagination-btn', { 'active': currentPage === page }]"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </button>

    <icon-button @click="handlePageChange(nbPages)" aria-label="Last Page">
      <ArrowRightIcon />
    </icon-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

export default defineComponent({
  setup() {
    const store = useStore();
    const filters = computed(() => store.state.moviesState.filters);
    const nbPages = computed(() => 500); // Replace with actual value from your store

    const pages = ref([1, 2, 3]);
    const currentPage = ref(1);

    const handlePageChange = (page: number) => {
      store.dispatch('updateMoviesFilters', { key: 'pageParam', value: page });
      store.dispatch('fetchMoviesRequest', filters.value);
      currentPage.value = page;
      updatePages(page);
    };

    const updatePages = (page: number) => {
      let newPages = [1, 2, 3];
      if (page === nbPages.value) {
        newPages = [nbPages.value - 2, nbPages.value - 1, nbPages.value];
      } else if (page !== 1) {
        newPages = [page - 1, page, page + 1];
      }
      pages.value = newPages;
    };

    return {
      pages,
      currentPage,
      nbPages,
      handlePageChange,
      ArrowLeftIcon,
      ArrowRightIcon,
    };
  },
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pagination-btn {
  background-color: #f7fafc;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.pagination-btn.active {
  background-color: #2b6cb0;
  color: white;
}

.pagination-btn:hover {
  background-color: #ebf8ff;
}

.icon-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
