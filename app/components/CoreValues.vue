<script setup lang="ts">
defineProps<{
  values: string[];
}>();
</script>

<template>
  <div>
    <ul class="space-y-2 lg:space-y-3 mt-0" v-if="values">
      <li
        class="flex items-center gap-4 ml-4 lg:ml-8"
        v-for="(value, idx) in values"
        :key="idx"
      >
        <span class="bg-brown p-1/2 rounded-full"></span>
        <span class="font-roboto text-sm lg:text-base text-brown">
          <span class="font-semibold">{{ value.split(':')[0] }}: </span>
          {{ value.split(':')[1] }}</span
        >
      </li>
    </ul>
  </div>
</template>
