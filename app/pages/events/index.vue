<script setup lang="ts">
const { data } = await useAsyncData('events', () =>
  queryCollection('events').path('/events-content').first()
);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});
</script>

<template>
  <div class="max-w-8xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <TheH1>Próximos Eventos</TheH1>
    </div>
    <div class="grid gap-16" v-if="data">
      <div
        class="bg-light grid grid-cols-1 group lg:grid-cols-3"
        v-for="(event, index) in data.events"
        :key="event.id"
      >
        <!-- Coluna imagem + texto -->
        <div
          class="lg:col-span-2 overflow-hidden"
          :class="[
            index % 2 !== 1
              ? 'order-2 lg:order-1 lg:flex lg:flex-row-reverse'
              : 'order-1 lg:order-2',
          ]"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              class="h-64 md:h-[30rem] overflow-hidden"
              :class="[
                index % 2 !== 1 ? 'order-2 md:order-1' : 'order-1 md:order-2',
              ]"
            >
              <NuxtImg
                :src="event.imageUrl"
                class="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div
              class="flex items-center p-5"
              :class="[
                index % 2 !== 1 ? 'order-1 md:order-2' : 'order-2 md:order-1',
              ]"
            >
              <div>
                <h3
                  class="mb-5 text-2xl relative inline-block text-brown font-medium"
                >
                  {{ event.title }}
                </h3>

                <TheParagraph class="max-w-xl lg:max-w-80 text-sm sm:text-base">
                  {{ event.description }}
                </TheParagraph>

                <hr class="w-20 border my-7" />

                <TheButton
                  class="bg-white group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primaryDense"
                >
                  <NuxtLink :to="`/events/${event.id}`">Saber mais</NuxtLink>
                </TheButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna Data -->
        <div
          class="px-6 py-8 lg:px-8 lg:py-16 text-start"
          :class="[
            index % 2 !== 1 ? 'order-1 lg:order-2' : 'order-2 lg:order-1',
          ]"
        >
          <h3 class="text-brown font-benton font-semibold text-xs sm:text-sm">
            DATA
          </h3>
          <CustomUL
            :items="[event.date]"
            :isStyled="true"
            class="text-sm sm:text-base"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-center text-gray-500">Carregando eventos...</p>
    </div>
  </div>
</template>
