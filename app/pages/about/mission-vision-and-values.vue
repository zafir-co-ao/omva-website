<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <AppH1 v-if="data?.title">{{ data.title }}</AppH1>

    <!-- Missão, Visão e Valores -->
    <div class="max-w-2xl mx-auto">
      <ContentRenderer class="grid gap-8" v-if="data" :value="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('mission-vision-values', () =>
  queryCollection('missionVisionAndValues')
    .path('/mission-vision-and-values-content')
    .first()
);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});
</script>
