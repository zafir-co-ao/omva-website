<template>
  <ul class="space-y-2 lg:space-y-3">
    <li
      class="flex items-center gap-4 m-4 lg:ml-8"
      v-for="(item, idx) in items"
      :key="idx"
    >
      <span class="bg-brown p-1/2 rounded-full"></span>
      <span class="font-roboto text-sm lg:text-base text-brown">{{
        item
      }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  items: string[];
}>();
</script>
