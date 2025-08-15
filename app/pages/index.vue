<script setup lang="ts">
const { data } = await useAsyncData('home', () => {
  return queryCollection('home').path('/home-content').first();
});

const articles = computed(() => {
  return data.value?.articles || null;
});

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
  ogTitle: data.value?.title,
  ogDescription: data.value?.description,
});
</script>

<template>
  <div>
    <!-- Hero Area -->
    <div class="relative">
      <div
        class="bg-hero-pattern bg-center bg-cover bg-no-repeat w-full h-[50vh] sm:h-[60vh] md:h-[70vh]"
      >
        <!-- Hero Reference -->
        <!-- <a href="https://www.vecteezy.com/free-photos/border-collie">
        Border Collie Stock photos by Vecteezy
       </a> -->
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
            <NuxtLink to="/membership" class="text-[#16c1d8] hover:underline"
              >Adesão/Renovação</NuxtLink
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div
      class="max-w-8xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8 mt-4 lg:mt-10"
    >
      <div v-if="articles" class="grid gap-12 grid-cols-1 lg:grid-cols-2">
        <!-- Left Column -->
        <div v-if="articles.main">
          <div class="h-[34vh] pt-3">
            <NuxtImg
              :src="articles.main.imageUrl"
              :alt="articles.main.title"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="text-center space-y-5 py-10 pt-20 px-8 bg-secondary">
            <h2
              class="font-semibold text-white font-benton text-xl lg:text-2xl"
            >
              {{ articles.main.title }}
            </h2>
            <p class="text-sm lg:text-base font-roboto text-slate-300">
              {{ articles.main?.description }}
            </p>

            <TheButton>
              <NuxtLink
                :to="articles.main.link"
                class="text-white font-medium text-sm font-roboto lg:text-base"
                >Ler mais</NuxtLink
              >
            </TheButton>
          </div>
        </div>

        <!-- Right Column -->
        <div v-if="articles.secondaries">
          <div class="grid gap-8">
            <div v-for="(article, idx) in articles.secondaries" :key="idx">
              <h3
                class="font-benton text-base lg:text-xl text-brown mb-1 font-semibold"
              >
                {{ article.title }}
              </h3>
              <TheParagraph>
                {{ article.description }}

                <NuxtLink
                  :to="article.link"
                  class="text-primary hover:underline"
                  >Ler mais</NuxtLink
                >
              </TheParagraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
