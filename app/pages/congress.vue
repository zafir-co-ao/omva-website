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

const bannerService = useBannerService();
const bannerOrErr = await bannerService.getCongressBanner();

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
    <!-- Titulo -->
    <TheH1 v-if="congress?.title">{{ congress.title }}</TheH1>

    <!-- Banner -->
    <BannerImage
      v-if="bannerImageUrl"
      alt="Imagem do Congresso OMVA"
      :src="bannerImageUrl"
    ></BannerImage>

    <!-- Congresso -->
    <ContentRenderer class="grid gap-6" v-if="congress" :value="congress" />
  </div>
</template>
