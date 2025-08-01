<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <AppH1 v-if="data?.title">{{ data.title }}</AppH1>

    <!-- História -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mx-auto">
      <div class="col-span-1 lg:h-64">
        <img src="/images/history.jpg" class="w-full h-auto shadow-md" alt="" />
      </div>
      <div class="col-span-2">
        <ContentRenderer class="grid gap-8" v-if="data" :value="data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('history', () =>
  queryCollection('content').path('/history-content').first()
);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});
</script>
