<template>
  <!-- Container Principal -->
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <!-- Título da Página -->
    <AppH1>{{ data?.title }}</AppH1>

    <!-- Grid para o layout de duas colunas -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
      <!-- Coluna Esquerda: Conteúdo Principal -->
      <div class="lg:col-span-2">
        <div class="max-w-none">
          <MyParagraph v-if="data?.description">{{
            data.description
          }}</MyParagraph>

          <div v-if="data?.roles" class="mt-8">
            <p class="mb-4 font-roboto text-sm lg:text-base text-brown">
              {{ data.roles.title }}
            </p>

            <ul class="space-y-3">
              <li
                class="ml-4 lg:ml-8 flex items-center gap-4"
                v-for="(item, i) in data.roles.items"
                :key="i"
              >
                <span class="bg-brown p-1/2 rounded-full"></span>
                <span class="font-roboto text-sm lg:text-base text-brown">
                  <span class="font-semibold">{{ item.split(':')[0] }}: </span>
                  {{ item.split(':')[1] }}</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Coluna Direita: Valores Fundamentais -->
      <div class="lg:col-span-1 flex justify-center" v-if="data?.coreValues">
        <div class="bg-greenLight shadow-lg text-center p-8 lg:p-10 h-full">
          <h2
            class="text-2xl font-semibold font-benton tracking-tight text-brown lg:mt-20"
          >
            {{ data.coreValues.title }}
          </h2>

          <div class="mt-8">
            <h3
              class="text-base lg:text-xl font-benton font-semibold text-brown"
            >
              {{ data.coreValues.description }}
            </h3>
            <ul
              class="mt-6 space-y-4 lg:space-y-5 text-sm lg:text-base font-roboto text-brown"
              v-for="(value, idx) in data.coreValues.values"
            >
              <li :key="idx">{{ value }}</li>
            </ul>
          </div>

          <AppButton class="bg-white mt-8">
            <NuxtLink to="/about/mission-vision-and-values"
              >Saber Mais</NuxtLink
            >
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('about', () =>
  queryCollection('about').path('/about-content').first()
);

useSeoMeta({
  title: data?.value?.title,
  description: data?.value?.description,
});
</script>
