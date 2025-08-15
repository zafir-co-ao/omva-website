<template>
  <p
    class="font-benton font-medium text-brown leading-6 text-sm lg:text-base text-start"
    :class="class"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
defineProps<{
  class?: string;
}>();
</script>
