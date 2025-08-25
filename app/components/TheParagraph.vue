<script setup lang="ts">
defineProps<{
  className?: string;
}>();
</script>
<template>
  <p
    class=""
    :class="[
      'font-benton font-medium text-brown leading-6 text-sm lg:text-base text-start',
      className,
    ]"
  >
    <slot />
  </p>
</template>
