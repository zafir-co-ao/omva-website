<script setup lang="ts">
const fullYear = new Date().getFullYear();
</script>
<template>
  <footer class="bg-footColor text-white px-4">
    <div
      class="max-w-8xl mx-auto py-14 lg:py-16 grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      <!-- Coluna 1: Logo e slogan -->
      <div
        class="mb-2 flex items-center justify-center lg:justify-start lg:items-start"
      >
        <NuxtLink to="/"
          ><NuxtImg src="/logo.svg" alt="logo OMVA" class="h-16 lg:h-20"
        /></NuxtLink>
      </div>

      <!-- Coluna 2: Links institucionais -->
      <div
        class="flex flex-col gap-2 text-sm font-benton items-center lg:items-start"
      >
        <NuxtLink to="/contacts" class="hover:underline">Contacte-nos</NuxtLink>
        <NuxtLink to="#" class="hover:underline"
          >Política de Privacidade</NuxtLink
        >
        <NuxtLink to="#" class="hover:underline">Termos de Uso</NuxtLink>
      </div>

      <!-- Coluna 3: Redes sociais -->
      <div class="flex flex-col items-center lg:items-start gap-4">
        <div class="flex gap-4">
          <!-- Facebook -->
          <a
            href="https://www.facebook.com/omvangola.co.ao"
            target="_blank"
            aria-label="Facebook"
            class="text-white hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.878C18.343 21.128 22 16.991 22 12z"
              />
            </svg>
          </a>
          <!-- Instagram -->
          <a
            href="https://www.instagram.com/omvangola/"
            target="_blank"
            aria-label="Instagram"
            class="text-white hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-1.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
              />
            </svg>
          </a>
          <!-- Email -->
          <a
            href="mailto:geral@omvangola.co.ao"
            aria-label="Email"
            target="_blank"
            class="text-white hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13 20 6.01V6H4zm0 12h16V8l-8 7-8-7v10z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div
      class="max-w-8xl mx-auto border-t-2 border-gray-500 mt-8 py-8 text-center lg:text-start text-sm text-white font-benton"
    >
      © {{ fullYear }} Ordem dos Médicos Veterinários de Angola. Todos os
      direitos reservados.
    </div>
  </footer>
</template>
