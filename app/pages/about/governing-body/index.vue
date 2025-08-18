<script setup lang="ts">
import { NuxtLink } from '#components';

const { data } = await useAsyncData('governing-body', () =>
  queryCollection('governingBody').path('/governing-body-content').first()
);

useSeoMeta({
  title: data?.value?.title,
  description: data.value?.description,
});
</script>

<template>
  <div
    class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 space-y-10"
    v-if="data"
  >
    <TheH1 v-if="data?.title">{{ data.title }}</TheH1>

    <!-- Corpo Directivo -->
    <div
      class="mx-auto max-w-2xl"
      v-for="(member, idx) in data.members"
      :key="idx"
    >
      <div class="space-y-2">
        <h2 class="hover:underline font-medium text-xl lg:text-2xl text-brown">
          <NuxtLink :to="`/about/governing-body/${member.id}`">{{
            member.name
          }}</NuxtLink>
        </h2>
        <TheParagraph class="lg:text-sm">{{
          member.role.toUpperCase()
        }}</TheParagraph>
        <TheParagraph>
          {{ member.description.slice(0, 300).toString() }}...
          <NuxtLink :to="`/about/governing-body/${member.id}`"
            ><span class="text-primary hover:underline"
              >Saber mais</span
            ></NuxtLink
          >
        </TheParagraph>
      </div>
    </div>
  </div>
</template>
