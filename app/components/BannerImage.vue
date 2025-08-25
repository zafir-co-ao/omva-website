<script setup lang="ts">
defineProps<{
  src: string;
}>();
</script>

<template>
  <div class="mt-[-2.5rem] mb-10 lg:mb-14 h-[60vh]">
    <NuxtImg :src="src" class="h-full w-full object-cover" />
  </div>
</template>
