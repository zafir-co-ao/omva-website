<script setup lang="ts">
const { data } = await useAsyncData('membership', () =>
  queryCollection('content').path('/membership-content').first()
);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});

const bannerService = useBannerService();
const bannerOrErr = await bannerService.getMembershipBanner();

if (bannerOrErr.isLeft()) {
  console.error(bannerOrErr.value);
}

const bannerImageUrl = ref<string>('');
if (bannerOrErr.isRight()) {
  bannerImageUrl.value = bannerOrErr.value.href;
}
</script>

<template>
  <div class="bg-white">
    <!-- Cabeçalho -->
    <div class="bg-secondary">
      <div class="max-w-8xl p-4 lg:py-6 m-auto">
        <h2
          class="text-white font-bold font-roboto text-[28px] lg:text-[34px] text-left lg:mt-6"
        >
          Aderir a OMVA
        </h2>
      </div>
    </div>

    <!-- Hero -->
    <NuxtImg
      v-if="bannerImageUrl"
      :src="bannerImageUrl"
      class="w-full h-auto max-h-[400px] object-cover"
      alt="Imagem sobre a adesão na OMVA"
    />

    <!-- Botões de Adesão e Renovação de Adesão -->
    <div class="mt-6 flex gap-4 items-center justify-center">
      <TheButton>Aderir a OMVA</TheButton>
      <TheButton>Renovar a sua Adesão</TheButton>
    </div>

    <!-- Grid Principal -->
    <div
      class="max-w-8xl w-full m-auto grid grid-cols-1 gap-10 lg:grid-cols-3 mt-10 mb-10 px-4 lg:px-[20px]"
    >
      <!-- Info de Contacto (fica embaixo no mobile) -->
      <div
        class="bg-secondary p-6 md:p-8 h-48 flex justify-start items-center order-last lg:order-none"
      >
        <div>
          <h3 class="font-semibold text-white mb-1 text-base lg:text-lg"></h3>
          <p class="text-white leading-6 text-sm lg:text-base font-benton">
            <strong>Questões sobre a Adesão</strong><br />
            Telefone: +244 932 131 935 <br />
            Segunda - Sexta | 8h:30min - 16h:30min <br />
            Email:
            <NuxtLink to="mailto:geral@omvangola.co.ao"
              ><span class="font-bold hover:underline"
                >geral@omvangola.co.ao</span
              ></NuxtLink
            >
          </p>
        </div>
      </div>

      <!-- Texto + Tabela -->
      <div class="col-span-1 lg:col-span-2">
        <ContentRenderer class="grid gap-10" v-if="data" :value="data" />
      </div>
    </div>
  </div>
</template>
