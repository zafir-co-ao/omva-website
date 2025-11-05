<script setup lang="ts">
const props = defineProps<{
  image: string;
  title: string;
  id: string;
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
    :key="id"
    :src="eventImageUrl"
    :alt="title"
    class="h-full w-full transform transition-transform duration-500 md:hover:scale-110 md:group-hover:scale-110"
  />
</template>
