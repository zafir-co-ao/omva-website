<script setup lang="ts">
import TheParagraph from '~/components/TheParagraph.vue';

const route = useRoute();
const eventImageUrl = ref<string>('');
const eventsService = useEventsService();

const { data } = await useAsyncData('event', () =>
  queryCollection('events').path('/events-content').first()
);

const event = computed(() => {
  return data.value?.events.find((event) => event.id === route.params.id);
});

useSeoMeta({
  title: event.value?.title || 'Evento Desconhecido',
  description:
    event.value?.description || 'Descrição do evento não disponível.',
  ogTitle: event.value?.title || 'Evento Desconhecido',
  ogDescription:
    event.value?.description || 'Descrição do evento não disponível.',
});

const eventOrErr = await eventsService.getEventURL(event.value?.image!);
if (eventOrErr.isLeft()) {
  console.error(eventOrErr.value);
}

if (eventOrErr.isRight()) {
  eventImageUrl.value = eventOrErr.value.href;
}

const normalizedWhatsapp = computed(() => {
  return event.value?.contactInfo?.whatsapp?.replace(/\D/g, '') || '';
});
</script>

<template>
  <div v-if="event">
    <div class="bg-secondary">
      <div class="max-w-8xl p-4 lg:py-6 m-auto">
        <h2
          class="text-white font-bold font-roboto text-2xl lg:text-3xl text-left lg:mt-6"
        >
          {{ event.title }}
        </h2>
        <p class="mt-2 text-primary font-semibold">{{ event.date }}</p>
      </div>
    </div>
    <div class="max-w-8xl mx-auto py-12 md:pb-20 md:pt-10 px-4 sm:px-6 lg:px-8">
      <div class="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-1">
          <NuxtImg :src="eventImageUrl" :alt="event.title" />
        </div>
        <div class="lg:col-span-2 space-y-4 max-w-2xl">
          <TheParagraph v-for="(p, idx) in event.fullDescription" :key="idx">
            {{ p }}</TheParagraph
          >

          <div class="space-y-1">
            <TheParagraph v-if="event.contactInfo">
              <p v-if="event.contactInfo.website">
                Link:
                <a
                  class="text-primary/80 hover:text-primary"
                  target="_blank"
                  :href="event.contactInfo.website.url"
                  >{{
                    event.contactInfo.website.description ||
                    event.contactInfo.website.url
                  }}</a
                >
              </p>
              <p v-if="event.contactInfo.whatsapp">
                WhatsApp:
                <a
                  class="text-primary/80 hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="`https://wa.me/${normalizedWhatsapp}`"
                >
                  {{ event.contactInfo.whatsapp }}
                </a>
              </p>
              <p v-if="event.contactInfo.email">
                Email:
                <a
                  class="text-primary/80 hover:text-primary"
                  :href="`mailto:${event.contactInfo.email}`"
                >
                  {{ event.contactInfo.email }}
                </a>
              </p>
              <p v-if="event.contactInfo.location">
                Localização: {{ event.contactInfo.location }}
              </p>
            </TheParagraph>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="max-w-8xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
    <p class="text-center text-gray-500">Evento não encontrado.</p>
  </div>
</template>
