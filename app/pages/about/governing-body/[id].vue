<script setup lang="ts">
const { data } = await useAsyncData('governing-body', () =>
  queryCollection('governingBody').path('/governing-body-content').first()
);

const route = useRoute();
const memberId = route.params.id as string;

const getMember = (id: string) => {
  return data.value?.members.find((member) => member.id === id);
};

const member = getMember(memberId);

useSeoMeta({
  title: member?.name,
  description: member?.description,
});
</script>

<template>
  <div>
    <div
      class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 lg:space-y-20"
      v-if="member"
    >
      <TheH1 v-if="data?.title">{{ member.name }}</TheH1>

      <!-- Corpo Directivo -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div class="sm:col-span-1">
          <div class="lg:h-72 relative lg:flex lg:justify-end">
            <img
              :src="member.imageUrl"
              class="object-cover h-full lg:w-64"
              :alt="member.name"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <TheH2>{{ member.role }}</TheH2>
          <div class="mt-6 space-y-6">
            <TheParagraph>
              {{ member.description }}
            </TheParagraph>

            <CustomUL
              v-if="member.list"
              :items="member.list"
              :isStyled="true"
            ></CustomUL>

            <TheParagraph v-if="member.subDescription">
              {{ member.subDescription }}
            </TheParagraph>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h-[40vh] flex justify-center items-center">
      <p class="text-center text-sm lg:text-base text-gray-500">
        Membro não encontrado.
        <NuxtLink to="/" class="text-primary hover:underline"
          >Voltar ao Início</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
