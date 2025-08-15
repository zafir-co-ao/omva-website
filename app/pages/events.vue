<script setup lang="ts">
import { NuxtImg } from '#components';
import TheParagraph from '~/components/TheParagraph.vue';

useSeoMeta({
  title: 'Eventos OMVA',
  description:
    'Descubra os próximos eventos e atividades que a nossa organização está a planear.',
});
</script>

<template>
  <div class="max-w-8xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <TheH1>Próximos Eventos</TheH1>
    </div>
    <div class="md:h-[30rem] bg-light">
      <div class="grid grid-cols-1 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="md:h-[30rem]">
              <NuxtImg
                src="/images/events/event-workshop-bovinocultura.jpeg"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="grid items-center p-5">
              <div>
                <h3 class="mb-5 font-medium text-2xl text-brown">The Title</h3>
                <TheParagraph class="max-w-80">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
                  consequuntur cumque, in nisi non reprehenderit placeat
                  consequatur quam saepe rerum blanditiis vitae delectus fugiat
                  quis quos ullam totam sit ad.
                </TheParagraph>

                <hr class="max-w-16 border-[1px] my-7" />

                <TheButton class="bg-white">Saber Mais</TheButton>
              </div>
            </div>
          </div>
        </div>
        <div class="">content right</div>
      </div>
    </div>
  </div>
</template>
