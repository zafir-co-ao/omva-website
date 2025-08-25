<script setup lang="ts">
import { ref } from 'vue';
import BannerImage from '~/components/BannerImage.vue';

const { data } = await useAsyncData('regional-councils', () =>
  queryCollection('regionalCouncils').path('/regional-councils-content').first()
);

const regionalCouncils = computed(() => {
  return data.value?.councils || [];
});

const openCouncils = ref<Set<number>>(new Set());

const toggleCouncil = (index: number) => {
  if (openCouncils.value.has(index)) {
    openCouncils.value.delete(index);
  } else {
    openCouncils.value.add(index);
  }
};

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description,
  ogDescription: data.value?.description,
});
</script>

<template>
  <div class="max-w-5xl mx-auto py-12 md:pb-20 md:pt-10 px-4 sm:px-6 lg:px-8">
    <!-- Título -->
    <TheH1>{{ data?.title }}</TheH1>

    <!-- Banner -->
    <BannerImage src="/images/banner-a1.jpeg"></BannerImage>

    <!-- Descrição -->
    <div class="mx-auto max-w-2xl">
      <TheParagraph>
        {{ data?.description }}
      </TheParagraph>

      <div class="mt-10 lg:mt-14">
        <div
          class="border-t-2 p-4 cursor-pointer group"
          @click="toggleCouncil(index)"
          :class="index === regionalCouncils.length - 1 ? 'border-b-2' : ''"
          v-for="(council, index) in regionalCouncils"
          :key="index"
        >
          <div class="flex items-center justify-between gap-4">
            <h3 class="font-medium text-gray-700 text-base lg:text-lg">
              {{ council.name }}
            </h3>
            <span :class="[openCouncils.has(index) ? 'rotate-0' : 'rotate-45']">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 group-hover:border h-8 w-8 lg:h-10 lg:w-10 text-gray-600 p-1 rounded-full transition-transform duration-300 ease-in-out"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>

          <div class="mt-6" v-show="openCouncils.has(index)">
            <TheParagraph class="max-w-xl">
              <span class="font-semibold">Email:</span> {{ council.email }}
              <br />
              <span v-if="council.phoneNumber">
                <span class="font-semibold">Telefone:</span> (+244)</span
              >
              {{ council.phoneNumber }} <br v-if="council.phoneNumber" />
              <span class="font-semibold">Endereço:</span> {{ council.address }}
            </TheParagraph>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
