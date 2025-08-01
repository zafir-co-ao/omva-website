<template>
  <div>
    <!-- Hero Area -->
    <div class="relative">
      <img src="/images/hero-main.webp" alt="Hero OMVA" />
      <div
        class="lg:absolute lg:left-20 lg:bottom-[-2rem] bg-secondary/95 p-12 lg:w-[480px] lg:h-64"
      >
        <div class="text-white text-center lg:text-left mt-4">
          <h1 class="text-2xl md:text-3xl font-semibold font-benton">
            Nossa Paixão. Nossa profissão.
          </h1>
          <p class="text-sm md:text-base mt-2 font-roboto">
            Capacitar os veterinários para prosperarem na profissão que todos
            nós adoramos.
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
            <MyParagraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestiae consectetur laborum eius, eveniet doloribus odio
              mollitia ex illum? Ipsa aliquam nobis doloremque aspernatur
              praesentium voluptatem? A eius repellat consectetur quis?
            </MyParagraph>
          </div>
          <div>
            <h3 class="font-benton text-xl text-brown mb-1 font-semibold">
              How Develop the veterinary profession
            </h3>
            <MyParagraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
              quia similique repellendus nam perspiciatis non, cupiditate
              deleniti doloribus, voluptatibus alias omnis. Officia pariatur
              aliquid. cupiditate deleniti doloribus, voluptatibus alias omnis.
              Officia pariatur aliquid.
            </MyParagraph>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'OMVA - Ordem dos Médicos Veterinários de Angola',
});
</script>
