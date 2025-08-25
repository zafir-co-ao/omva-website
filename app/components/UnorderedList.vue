<script setup lang="ts">
const props = defineProps<{
  class?: string;
  isStyled?: boolean | string;
  items: string[] | string;
}>();

const parsedItems = computed(() => {
  return Array.isArray(props.items)
    ? props.items
    : JSON.parse(props.items as string);
});
</script>

<template>
  <ul :class="['space-y-2 lg:space-y-3', props.class]">
    <li
      class="flex items-center gap-4 m-4 lg:ml-8"
      v-for="(item, idx) in parsedItems"
      :key="idx"
    >
      <span v-if="props.isStyled" class="bg-brown p-1/2 rounded-full"></span>
      <span class="font-roboto text-sm lg:text-base text-brown">{{
        item
      }}</span>
    </li>
  </ul>
</template>
