<script setup lang="ts">
import BannerImage from '~/components/BannerImage.vue';

const { data } = await useAsyncData('general-assembly', () => {
  return queryCollection('content').path('/general-assembly-content').first();
});

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description,
  ogDescription: data.value?.description,
});

const bannerService = useBannerService();
const bannerOrErr = await bannerService.getGeneralAssemblyBanner();

if (bannerOrErr.isLeft()) {
  console.error(bannerOrErr.value);
}

const bannerImageUrl = ref<string>('');
if (bannerOrErr.isRight()) {
  bannerImageUrl.value = bannerOrErr.value.href;
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <TheH1 v-if="data?.title">{{ data.title }}</TheH1>

    <BannerImage
      v-if="bannerImageUrl"
      alt="Imagem sobre a Assembleia Geral da OMVA"
      :src="bannerImageUrl"
    ></BannerImage>

    <!-- Assembleia Geral -->
    <ContentRenderer class="grid gap-6" v-if="data" :value="data" />
  </div>
</template>
