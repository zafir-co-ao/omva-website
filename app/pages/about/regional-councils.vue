<script setup lang="ts">
import { ref } from 'vue';

const { data } = await useAsyncData('regional-councils', () =>
  queryCollection('regionalCouncils').path('/regional-councils-content').first()
);

const regionalCouncils = computed(() => {
  return data.value?.councils || [];
});

const openCouncils = ref<Set<number>>(new Set());

const toggle = (index: number) => {
  if (openCouncils.value.has(index)) {
    openCouncils.value.delete(index);
  } else {
    openCouncils.value.add(index);
  }
};
</script>

<template>
  <div class="max-w-5xl mx-auto py-12 md:pb-20 md:pt-10 px-4 sm:px-6 lg:px-8">
    <TheH1>{{ data?.title }}</TheH1>

    <div class="mt-[-2.5rem] mb-10 lg:mb-14 h-[60vh]">
      <NuxtImg
        src="/images/banner-a1.jpeg"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="mx-auto max-w-2xl">
      <TheParagraph>
        {{ data?.description }}
      </TheParagraph>

      <div class="mt-10 lg:mt-14">
        <div
          class="border-t-2 p-4 cursor-pointer group"
          @click="toggle(index)"
          :class="index === regionalCouncils.length - 1 ? 'border-b-2' : ''"
          v-for="(council, index) in regionalCouncils"
          :key="index"
        >
          <div class="flex items-center justify-between gap-4">
            <h3 class="font-medium text-gray-700 text-sm lg:text-base">
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
              <span>Email:</span> {{ council.email }} <br />
              <span v-if="council.phoneNumber">Telefone: (+244)</span>
              {{ council.phoneNumber }} <br v-if="council.phoneNumber" />
              <span>Endereço:</span> {{ council.address }}
            </TheParagraph>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
