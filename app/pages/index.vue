<script setup lang="ts">
import { NuxtImg } from '#components';
import EventImage from '~/components/EventImage.vue';

const bannersService = useBannerService();
const bannerImageUrl = ref<string>('');

const [bannerOrErr, homeContent, eventsContent] = await Promise.all([
  bannersService.getHomeBanner(),
  queryCollection('home').path('/home-content').first(),
  queryCollection('events').path('/events-content').first(),
]);

const event = computed(() => {
  return eventsContent?.events[0] || null;
});

if (bannerOrErr.isRight()) {
  bannerImageUrl.value = bannerOrErr.value.href;
}

useSeoMeta({
  title: homeContent?.title,
  description: homeContent?.description,
  ogTitle: homeContent?.title,
  ogDescription: homeContent?.description,
});
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
      <div v-if="homeContent?.partners" class="mt-20 px-4">
        <div class="border-b-[3px] w-fit mb-4 mx-auto lg:mx-0">
          <h2
            class="mb-4 text-brown text-2xl sm:text-3xl font-benton font-medium text-left"
          >
            Nossos Parceiros
          </h2>
        </div>

        <div
          v-if="homeContent.partners.others"
          class="mt-12 grid sm:grid-cols-2 xl:grid-cols-4 items-center gap-4 sm:gap-6 transition-all duration-300 w-full"
        >
          <NuxtLink
            v-for="(partner, i) in homeContent.partners.others"
            :key="i"
            :to="partner.linkPage"
            target="_blank"
            class="px-4 py-5 sm:p-6 text-center h-34 flex-shrink-0 border xl:hover:scale-105 transition-transform duration-300"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="mx-auto mb-3 sm:mb-4 h-14 sm:h-20 object-contain"
            />
            <p class="text-brown text-sm sm:text-base font-normal font-roboto">
              {{ partner.name }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
