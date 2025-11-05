<script setup lang="ts">
import { NuxtImg } from '#components';
import EventImage from '~/components/EventImage.vue';
import Slide from '~/components/Slide.vue';

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
        ></div>
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
      <!-- Event Section -->
      <div v-if="event" class="grid grid-cols-1 md:grid-cols-3 shadow-xl">
        <div class="h-[70vh] md:h-[34rem] overflow-hidden">
          <EventImage
            :image="event.image"
            :id="event.id"
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

      <!-- Partners Section -->
      <div v-if="data?.partners" class="mt-20 px-4">
        <div class="border-b-[3px] w-fit mb-16 mx-auto lg:mx-0">
          <h2
            class="mb-4 text-brown text-2xl sm:text-3xl font-benton font-medium text-left"
          >
            Nossos Parceiros
          </h2>
        </div>

        <div
          class="relative flex flex-col lg:flex-row gap-10 lg:gap-10 items-center lg:items-start"
        >
          <div
            v-if="data.partners.main"
            class="shadow-lg border w-full sm:w-[24rem] lg:w-[40rem] py-12 text-center"
          >
            <NuxtImg
              :src="data.partners.main.logo"
              :alt="data.partners.main.name"
              class="mx-auto mb-4 h-16 sm:h-20"
            />
            <p
              class="text-brown text-xl sm:text-2xl font-normal font-roboto px-4"
            >
              {{ data.partners.main.name }}
            </p>
          </div>

          <Slide v-if="data.partners.others" :partners="data.partners.others" />
        </div>
      </div>
    </div>
  </div>
</template>
