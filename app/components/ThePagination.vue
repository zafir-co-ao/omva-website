<script setup lang="ts" generic="T">
const props = withDefaults(
  defineProps<{
    items: T[];
    pageSize?: number;
  }>(),
  {
    pageSize: 5,
  }
);

const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(props.items.length / props.pageSize)
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize;
  const end = start + props.pageSize;
  return props.items.slice(start, end);
});

const setPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div>
    <!-- Render paginated items via scoped slot -->
    <slot :paginated-items="paginatedItems" />

    <!-- Pagination Controls -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center gap-4 mt-12"
    >
      <!-- Previous Button -->
      <button
        @click="setPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Página anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Page Numbers -->
      <div class="flex gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="setPage(page)"
          :class="[
            'px-4 py-2 border rounded transition-colors',
            currentPage === page
              ? 'bg-primary text-white border-primary'
              : 'border-gray-300 hover:bg-gray-100 text-brown',
          ]"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="setPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Próxima página"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
