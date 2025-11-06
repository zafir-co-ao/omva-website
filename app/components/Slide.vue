<script setup lang="ts">
import { NuxtLink } from '#components';

const props = defineProps<{
  partners: { logo: string; name: string; linkPage: string }[];
}>();

const currentIndex = ref(0);
const visibleSlides = 3;

const partners = computed(() => {
  const start = currentIndex.value;
  const end = start + visibleSlides;
  return props.partners.slice(start, end);
});

function nextSlide() {
  const total = currentIndex.value + visibleSlides;

  if (total < props.partners.length) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = props.partners.length - visibleSlides;
  }
}

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  if (props.partners.length > visibleSlides) {
    interval = setInterval(nextSlide, 10000);
  }
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
<template>
  <div class="w-full overflow-hidden space-y-5 lg:space-y-0">
    <div
      v-if="partners.length >= visibleSlides"
      class="lg:absolute top-[-7rem] right-0 flex justify-end items-center w-full gap-4"
    >
      <button @click="prevSlide" class="bg-gray-200 hover:bg-gray-300 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5 sm:size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button @click="nextSlide" class="bg-gray-200 hover:bg-gray-300 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5 sm:size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>

    <div
      :class="partners.length > visibleSlides ? 'justify-center' : ''"
      class="flex items-center sm:h-[14rem] gap-4 sm:gap-6 overflow-hidden transition-all duration-300 w-full"
    >
      <NuxtLink
        v-for="(partner, i) in partners"
        :key="i"
        :to="partner.linkPage"
        target="_blank"
        class="p-4 sm:p-6 text-center w-44 md:w-[18rem] flex-shrink-0 border hover:scale-105 transition-transform duration-300"
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
</template>
