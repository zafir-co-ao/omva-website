<script setup lang="ts">
const congress = await queryCollection('content')
  .path('/congress-content')
  .first();

useSeoMeta({
  title: congress?.title,
  ogTitle: congress?.title,
  description: congress?.description,
  ogDescription: congress?.description,
});
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <!-- Titulo -->
    <TheH1 v-if="congress?.title">{{ congress.title }}</TheH1>

    <!-- Banner -->
    <BannerImage src="/images/banner-c1.jpg"></BannerImage>

    <!-- Congresso -->
    <ContentRenderer class="grid gap-6" v-if="congress" :value="congress" />
  </div>
</template>
