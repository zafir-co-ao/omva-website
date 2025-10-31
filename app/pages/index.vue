<script setup lang="ts">
import { NuxtImg } from '#components';
import EventImage from '~/components/EventImage.vue';

const { data } = await useAsyncData('home', () => {
  return queryCollection('home').path('/home-content').first();
});

const eventsContent = await queryCollection('events')
  .path('/events-content')
  .first();

const event = computed(() => {
  return eventsContent?.events[0] || null;
});

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
  ogTitle: data.value?.title,
  ogDescription: data.value?.description,
});

const bannersService = useBannerService();
const bannerOrErr = await bannersService.getHomeBanner();

if (bannerOrErr.isLeft()) {
  console.error(bannerOrErr.value);
}

const bannerImageUrl = ref<string>('');
if (bannerOrErr.isRight()) {
  bannerImageUrl.value = bannerOrErr.value.href;
}
</script>

<template>
  <div>
    <!-- Hero Area -->
    <div class="relative">
      <div
        class="bg-center bg-cover bg-no-repeat w-full h-[50vh] sm:h-[60vh] md:h-[70vh]"
      >
        <!-- Hero Reference -->
        <NuxtImg
          v-if="bannerImageUrl"
          :src="bannerImageUrl"
          alt="Hero Image"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full bg-gray-200 flex items-center justify-center"
        >
          <span class="text-gray-500">Imagem não disponível</span>
        </div>
      </div>

      <!-- Hero Overlay -->
      <div
        class="lg:absolute lg:left-20 lg:bottom-[-2rem] bg-secondary/95 p-12 lg:w-[480px] lg:h-64"
      >
        <div class="text-white text-center lg:text-left mt-6">
          <h1 class="text-2xl md:text-3xl font-semibold font-benton">
            A profissão é o nosso legado.
          </h1>
          <p class="text-sm md:text-base mt-4 font-roboto">
            Defende os teus direitos com responsabilidade e honra os teus
            deveres.
            <NuxtLink to="/registraction" class="text-[#16c1d8] hover:underline"
              >Inscrição</NuxtLink
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div
      class="max-w-8xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8 mt-4 lg:mt-10"
    >
      <div v-if="event" class="grid grid-cols-1 md:grid-cols-3 shadow-xl">
        <div class="h-[70vh] md:h-[34rem] overflow-hidden">
          <EventImage
            :image="event.image"
            :key="event.id"
            :title="event.title"
          ></EventImage>
        </div>
        <div
          class="bg-secondary grid justify-center items-center md:col-span-2"
        >
          <div class="text-center space-y-5 py-10 pt-20 px-8">
            <h2
              class="font-semibold text-white font-benton text-xl lg:text-2xl"
            >
              {{ event.title }}
            </h2>
            <p class="text-sm lg:text-base font-roboto text-slate-300">
              {{ event.description }}
            </p>

            <TheButton>
              <NuxtLink
                :to="`/events/${event.id}`"
                class="text-white font-medium text-sm font-roboto lg:text-base"
                >Saber mais</NuxtLink
              >
            </TheButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
