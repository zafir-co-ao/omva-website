<script setup lang="ts">
import BannerImage from '~/components/BannerImage.vue';

const bannerService = useBannerService();
const bannerImageUrl = ref<string>('');

const [pageContent, bannerOrErr] = await Promise.all([
  queryCollection('content').path('/general-assembly-content').first(),
  bannerService.getGeneralAssemblyBanner(),
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
    <TheH1 v-if="pageContent?.title">{{ pageContent.title }}</TheH1>

    <BannerImage
      v-if="bannerImageUrl"
      alt="Imagem sobre a Assembleia Geral da OMVA"
      :src="bannerImageUrl"
    ></BannerImage>

    <!-- Assembleia Geral -->
    <ContentRenderer
      class="grid gap-6"
      v-if="pageContent"
      :value="pageContent"
    />
  </div>
</template>
