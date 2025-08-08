<template>
  <div>
    <!-- Hero Area -->
    <div class="relative">
      <div
        class="bg-hero-pattern bg-center bg-cover bg-no-repeat h-[70vh]"
      ></div>

      <!-- Hero Overlay -->
      <div
        class="lg:absolute lg:left-20 lg:bottom-[-2rem] bg-secondary/95 p-12 lg:w-[480px] lg:h-64"
      >
        <div class="text-white text-center lg:text-left mt-6">
          <h1 class="text-2xl md:text-3xl font-semibold font-benton">
            A profissão é o nosso legado.
          </h1>
          <p class="text-sm md:text-base mt-4 font-roboto">
            Defende os teus direitos com responsabilidade e honra os teus
            deveres.
            <NuxtLink to="/membership" class="text-[#16c1d8] hover:underline"
              >Adesão/Renovação</NuxtLink
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="max-w-8xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div>Content 1</div>
        <div class="grid gap-8">
          <div>
            <h3 class="font-benton text-xl text-brown mb-1 font-semibold">
              The Deep Drive in wolrd of veterinary medicine
            </h3>
            <AppParagraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestiae consectetur laborum eius, eveniet doloribus odio
              mollitia ex illum? Ipsa aliquam nobis doloremque aspernatur
              praesentium voluptatem? A eius repellat consectetur quis?
            </AppParagraph>
          </div>
          <div>
            <h3 class="font-benton text-xl text-brown mb-1 font-semibold">
              How Develop the veterinary profession
            </h3>
            <AppParagraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
              quia similique repellendus nam perspiciatis non, cupiditate
              deleniti doloribus, voluptatibus alias omnis. Officia pariatur
              aliquid. cupiditate deleniti doloribus, voluptatibus alias omnis.
              Officia pariatur aliquid.
            </AppParagraph>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Home | Ordem dos Médicos Veterinários de Angola',
});
</script>
