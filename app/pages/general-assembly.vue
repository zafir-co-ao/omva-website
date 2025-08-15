<script setup lang="ts">
const { data } = await useAsyncData('general-assembly', () => {
  return queryCollection('content').path('/general-assembly-content').first();
});

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description,
  ogDescription: data.value?.description,
});
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <TheH1 v-if="data?.title">{{ data.title }}</TheH1>

    <div class="mt-[-2.5rem] mb-8 h-[60vh]">
      <NuxtImg
        src="/images/banner-a1.jpeg"
        class="h-full w-full object-cover"
      />
    </div>

    <!-- Assembleia Geral -->
    <ContentRenderer class="grid gap-6" v-if="data" :value="data" />
  </div>
</template>
