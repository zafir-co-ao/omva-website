<script setup lang="ts">
const { data } = await useAsyncData('history', () =>
  queryCollection('content').path('/history-content').first()
);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
  ogTitle: data.value?.title,
  ogDescription: data.value?.description,
});

const bannerService = useBannerService();
const bannerOrErr = await bannerService.getHistoryBanner();
if (bannerOrErr.isLeft()) {
  console.error(bannerOrErr.value);
}

const bannerImageUrl = ref<string>('');
if (bannerOrErr.isRight()) {
  bannerImageUrl.value = bannerOrErr.value.href;
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <TheH1 v-if="data?.title">{{ data.title }}</TheH1>

    <!-- História -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mx-auto">
      <div class="col-span-1 lg:h-64">
        <NuxtImg
          :src="bannerImageUrl"
          class="w-full h-auto"
          alt="{{ data.title }}"
        />
      </div>
      <div class="col-span-2">
        <ContentRenderer class="grid gap-10" v-if="data" :value="data" />
      </div>
    </div>
  </div>
</template>
