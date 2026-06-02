<script setup lang="ts">
import { NuxtImg } from '#components';
import EventImage from '~/components/EventImage.vue';

const bannersService = useBannerService();
const homeBannerImageUrl = ref<string>('');
const professionalCedulaBannerImageUrl = ref<string>('');

const [
  bannerOrErr,
  homeContent,
  eventsContent,
  aboutContent,
  professionalCedulaBanner,
] = await Promise.all([
  bannersService.getHomeBanner(),
  queryCollection('home').path('/home-content').first(),
  queryCollection('events').path('/events-content').first(),
  queryCollection('about').path('/about-content').first(),
  bannersService.getProfessionalCedulaBanner(),
]);

if (bannerOrErr.isRight()) {
  homeBannerImageUrl.value = bannerOrErr.value.href;
}

if (professionalCedulaBanner.isRight()) {
  professionalCedulaBannerImageUrl.value = professionalCedulaBanner.value.href;
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
    <div class="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <NuxtImg
        v-if="homeBannerImageUrl"
        :src="homeBannerImageUrl"
        alt="Hero Image"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full bg-gray-200 flex items-center justify-center"
      ></div>

      <!-- Hero Overlay -->
      <div
        class="absolute inset-0 bg-black/30 flex items-center lg:items-end lg:pb-20"
      >
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            class="bg-secondary/95 p-8 md:p-12 lg:w-[540px] text-white space-y-6 shadow-2xl"
          >
            <h1
              class="text-3xl md:text-4xl lg:text-5xl font-semibold font-benton leading-tight"
            >
              A profissão é o <br class="hidden md:block" />
              nosso legado.
            </h1>
            <p class="text-base md:text-lg font-roboto text-slate-200 max-w-md">
              Defende os teus direitos com responsabilidade e honra os teus
              deveres perante a profissão e a sociedade.
            </p>
            <div class="pt-4">
              <TheButton
                className="bg-primary border-none hover:bg-primaryDense text-white py-3 px-8 text-base"
              >
                <NuxtLink to="/registraction">Inscrever-se na Ordem</NuxtLink>
              </TheButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section: Sobre a Ordem -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="inline-block border-b-4 border-primary pb-2">
              <h2
                class="text-3xl md:text-4xl font-benton font-medium text-brown"
              >
                {{ aboutContent?.title || 'Sobre a Ordem' }}
              </h2>
            </div>
            <TheParagraph className="text-lg leading-relaxed text-gray-700">
              {{ aboutContent?.description }}
            </TheParagraph>
            <div class="pt-4">
              <TheButton className="py-3 px-10">
                <NuxtLink to="/about">Saber Mais</NuxtLink>
              </TheButton>
            </div>
          </div>
          <div class="relative group">
            <div
              class="absolute -inset-4 bg-primary/10 rounded-xl transform rotate-3 transition-transform group-hover:rotate-0 duration-300"
            ></div>
            <NuxtImg
              :src="professionalCedulaBannerImageUrl"
              alt="Cédula Profissional"
              class="relative rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Section: Missão, Visão e Valores -->
    <section class="bg-light py-16 md:py-24">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="mb-16">
          <h2
            class="text-3xl md:text-4xl font-benton font-medium text-brown mb-4"
          >
            Nossos Pilares
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto font-roboto">
            Guiamos as nossas ações com base em princípios sólidos para o
            desenvolvimento da medicina veterinária em Angola.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Mission -->
          <div
            class="bg-white p-8 shadow-lg rounded-sm border-t-4 border-primary hover:-translate-y-2 transition-transform duration-300"
          >
            <div class="text-primary mb-6 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold font-benton text-brown mb-4">
              Missão
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed font-roboto">
              Promover, regular e valorizar o exercício da medicina veterinária
              em Angola, assegurando a qualidade e o bem-estar animal.
            </p>
          </div>

          <!-- Vision -->
          <div
            class="bg-white p-8 shadow-lg rounded-sm border-t-4 border-secondary hover:-translate-y-2 transition-transform duration-300"
          >
            <div class="text-secondary mb-6 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold font-benton text-brown mb-4">Visão</h3>
            <p class="text-gray-600 text-sm leading-relaxed font-roboto">
              Ser reconhecida como uma instituição de excelência na regulação e
              promoção da medicina veterinária em Angola.
            </p>
          </div>

          <!-- Values -->
          <div
            class="bg-white p-8 shadow-lg rounded-sm border-t-4 border-primaryDense hover:-translate-y-2 transition-transform duration-300"
          >
            <div class="text-primaryDense mb-6 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold font-benton text-brown mb-4">
              Valores
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed font-roboto">
              Ética, Excelência, Responsabilidade Social, Transparência e
              Compromisso com a Classe.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section: Eventos e Notícias -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div class="max-w-xl">
            <h2
              class="text-3xl md:text-4xl font-benton font-medium text-brown mb-4"
            >
              Próximos Eventos
            </h2>
            <p class="text-gray-600 font-roboto">
              Participe dos nossos workshops, conferências e formações para o
              fortalecimento da classe veterinária.
            </p>
          </div>
          <TheButton className="whitespace-nowrap">
            <NuxtLink to="/events">Ver Todos os Eventos</NuxtLink>
          </TheButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="event in eventsContent?.events.slice(0, 3)"
            :key="event.id"
            class="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div class="relative h-64 overflow-hidden bg-gray-100">
              <EventImage
                v-if="event.image"
                :image="event.image"
                :title="event.title"
                :id="event.id"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div
                class="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs font-bold font-roboto uppercase tracking-wider"
              >
                {{ event.date }}
              </div>
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3
                class="text-xl font-bold font-benton text-brown mb-4 group-hover:text-primary transition-colors"
              >
                {{ event.title }}
              </h3>
              <p
                class="text-gray-600 text-sm font-roboto mb-6 flex-grow line-clamp-3"
              >
                {{ event.description }}
              </p>
              <NuxtLink
                :to="`/events/${event.id}`"
                class="text-primary font-semibold text-sm uppercase tracking-wider flex items-center gap-2 hover:underline"
              >
                Saber Mais
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Section: Parceiros -->
    <section v-if="homeContent?.partners" class="bg-light py-16 md:py-24">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="mb-12">
          <h2
            class="text-3xl md:text-4xl font-benton font-medium text-brown mb-4"
          >
            Nossos Parceiros
          </h2>
          <div class="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div
          v-if="homeContent.partners.others"
          class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <NuxtLink
            v-for="(partner, i) in homeContent.partners.others"
            :key="i"
            :to="partner.linkPage"
            target="_blank"
            class="bg-white p-8 flex flex-col items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="h-16 md:h-20 object-contain mb-4 transition-all duration-500"
            />
            <p
              class="text-gray-500 text-sm font-medium font-roboto group-hover:text-brown"
            >
              {{ partner.name }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
