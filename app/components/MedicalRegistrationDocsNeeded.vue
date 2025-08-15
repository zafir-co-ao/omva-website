<script setup lang="ts">
defineProps<{
  title: string;
  items: string[];
}>();
</script>

<template>
  <div>
    <h3 class="text-xl lg:text-2xl font-medium leading-8 font-benton mb-4">
      {{ title }}
    </h3>
    <ul class="space-y-2 lg:space-y-3">
      <li
        class="flex items-center gap-2"
        v-for="(item, idx) in items"
        :key="idx"
      >
        <span class="text-primary"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
        <span class="font-roboto text-sm lg:text-base text-brown">{{
          item
        }}</span>
      </li>
    </ul>
  </div>
</template>
