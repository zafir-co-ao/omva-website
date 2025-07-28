<template>
  <div class="max-w-xl overflow-x-auto">
    <table class="min-w-[400px] w-full text-left border-collapse shadow-lg">
      <thead>
        <tr class="bg-primary text-sm font-semibold lg:text-base text-white">
          <th class="px-4 py-3">
            {{ thead.title1 }}
          </th>
          <th class="px-4 py-3 text-right">
            {{ thead.title2 }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white text-brown">
        <tr
          class="border-t text-sm lg:text-base"
          v-for="(tr, idx) in tbody"
          :key="idx"
        >
          <td class="px-4 py-3" :class="[idx === 0 ? 'font-semibold' : '']">
            {{ tr.title }}
          </td>
          <td
            class="px-4 py-3 text-right"
            :class="[idx === 0 ? 'font-semibold' : '']"
          >
            {{ tr.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  thead: {
    title1: string;
    title2: string;
  };
  tbody: {
    title: string;
    value: string;
  }[];
}>();
</script>
