<script setup lang="ts">
const props = defineProps<{
  image: string;
  title: string;
  key: string;
}>();

const eventsService = useEventsService();
const { data: eventImageUrl } = await useAsyncData(
  `${props.image}-${Math.random()}`,
  () =>
    eventsService
      .getEventURL(props.image)
      .then((res) => (res.isRight() ? res.value.href : ''))
);
</script>

<template>
  <NuxtImg
    :key="key"
    :src="eventImageUrl"
    :alt="title"
    class="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
  />
</template>
