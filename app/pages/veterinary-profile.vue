<script setup lang="ts">
const bannerImageUrl = ref<string>('');
const bannerService = useBannerService();

const [bannerOrErr, pageContent] = await Promise.all([
  bannerService.getVeterinaryProfileBanner(),
  queryCollection('content').path('/veterinary-profile-content').first(),
]);

if (bannerOrErr.isRight()) {
  bannerImageUrl.value = bannerOrErr.value.href;
}

useSeoMeta({
  title: pageContent?.title,
  description: pageContent?.description,
  ogTitle: pageContent?.title,
  ogDescription: pageContent?.description,
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <TheH1 v-if="pageContent?.title">{{ pageContent.title }}</TheH1>

    <!-- História -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mx-auto">
      <div class="col-span-1 lg:h-64">
        <NuxtImg
          :src="bannerImageUrl"
          class="w-full h-auto"
          :alt="pageContent?.title"
        />
      </div>
      <div class="col-span-2">
        <ContentRenderer
          class="grid gap-6"
          v-if="pageContent"
          :value="pageContent"
        />
      </div>
    </div>
  </div>
</template>
