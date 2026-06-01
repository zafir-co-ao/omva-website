<script setup lang="ts">
const bannerImageUrl = ref<string>('');
const bannerService = useBannerService();

const [pageContent, bannerOrErr] = await Promise.all([
  queryCollection('content').path('/congress-content').first(),
  bannerService.getCongressBanner(),
]);

if (bannerOrErr.isRight()) {
  bannerImageUrl.value = bannerOrErr.value.href;
}

useSeoMeta({
  title: pageContent?.title,
  ogTitle: pageContent?.title,
  description: pageContent?.description,
  ogDescription: pageContent?.description,
});
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <!-- Titulo -->
    <TheH1 v-if="pageContent?.title">{{ pageContent.title }}</TheH1>

    <!-- Banner -->
    <BannerImage
      v-if="bannerImageUrl"
      alt="Imagem do Congresso OMVA"
      :src="bannerImageUrl"
    ></BannerImage>

    <!-- Congresso -->
    <ContentRenderer
      class="grid gap-6"
      v-if="pageContent"
      :value="pageContent"
    />
  </div>
</template>
