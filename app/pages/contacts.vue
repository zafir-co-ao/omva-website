<template>
  <div class="max-w-8xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <TheH1>Contacte-nos</TheH1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <form class="md:col-span-2 space-y-5 group">
        <div class="grid">
          <label
            for="name"
            class="text-brown font-benton font-medium text-sm lg:text-base"
            >NOME <span class="text-red-600 text-base">*</span></label
          >
          <input
            type="text"
            name="name"
            class="py-3 px-4 text-sm lg:text-base border-2 mt-2 outline-secondary text-gray-600"
          />
        </div>
        <div class="grid">
          <label
            for="email"
            class="text-brown font-benton font-medium text-sm lg:text-base"
            >EMAIL <span class="text-red-600 text-base">*</span></label
          >
          <input
            type="email"
            name="email"
            class="py-3 px-4 text-sm lg:text-base border-2 mt-2 outline-secondary text-gray-600"
          />
        </div>
        <div class="grid">
          <label
            for="comment"
            class="text-brown font-benton font-medium text-sm lg:text-base"
            >QUAL A SUA QUESTÃO/COMENTÁRIO
            <span class="text-red-600 text-base">*</span></label
          >
          <textarea
            name="comment"
            class="py-3 px-4 h-40 text-sm lg:text-base border-2 mt-2 outline-secondary text-gray-600"
          ></textarea>
        </div>
        <TheButton>Submeter</TheButton>
      </form>
      <div class="md:col-span-1">
        <div class="bg-[#f7f8f8] px-6 py-8 pt-16">
          <h2
            class="font-medium font-roboto mb-2 leading-3 text-brown text-xl lg:text-2xl"
          >
            Sede
          </h2>
          <div class="space-y-2 text-sm lg:text-base text-brown">
            <p>
              Condomínio Villa de Luanda, Edifício Mavinga, 4.º andar, Ala
              Direita, Apartamento 406, Rua da antiga FILDA, Luanda, Angola
            </p>
            <p><span class="font-medium">Telefone:</span> +244 932 131 935</p>
            <p>
              <span class="font-medium">Email: </span>
              <NuxtLink
                to="mailto:geral@omvangola.co.ao"
                class="hover:underline"
                >geral@omvangola.co.ao</NuxtLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Contacte-nos | Ordem dos Médicos Veterinários de Angola',
  description: 'Entre em contacto connosco para mais informações ou questões.',
});
</script>
