<template>
  <header>
    <!-- Barra superior -->
    <div class="bg-white">
      <div
        class="max-w-8xl lg:mx-auto lg:px-6 lg:py-3 flex items-center justify-between"
      >
        <div class="lg:hidden">
          <button
            @click="toggleMobileMenu()"
            class="p-4"
            :class="[!isMobileMenuOpen ? '' : 'bg-gray-600']"
          >
            <!-- icone Humburger -->
            <i v-if="!isMobileMenuOpen">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 hover:text-secondary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </i>

            <!-- icone Close -->
            <i v-else class="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </i>
          </button>
        </div>
        <a
          href="/"
          class="flex items-center gap-3 border-x-2 lg:border-none w-full lg:w-auto"
        >
          <img src="/logo.svg" alt="OMVA" class="w-full h-14 lg:h-20" />
        </a>
        <div class="lg:flex items-center gap-6 hidden">
          <NuxtLink to="/membership" class="text-brown text-sm font-benton">
            Adesão/Renovação
          </NuxtLink>
          <AppButton class="ml-8">Entrar</AppButton>
        </div>
        <NuxtLink class="lg:hidden p-4" to="#">
          <i>
            <svg
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </i>
        </NuxtLink>
      </div>
    </div>

    <!-- NavBar Mobile -->
    <div v-if="isMobileMenuOpen" class="lg:hidden bg-secondary/95 shadow">
      <ul
        class="flex flex-col font-semibold text-white text-sm font-benton ease-linear"
      >
        <li v-for="item in navItems" :key="item.to || item.label">
          <NuxtLink
            v-if="!item.subItems"
            :to="item.to"
            class="block p-4 border-b border-slate-500 hover:bg-secondary font-benton"
          >
            {{ item.label }}
          </NuxtLink>

          <div v-else>
            <div
              class="p-4 border-b text-sm border-slate-500 cursor-pointer hover:bg-secondary flex items-center gap-3"
              @click="toggleDropdownMenu(item.label)"
            >
              <span>{{ item.label }}</span>
              <i
                :class="[
                  item.subItems && openDropdownLabel === item.label
                    ? 'rotate-180'
                    : '',
                ]"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </i>
            </div>
            <ul v-if="item.subItems && openDropdownLabel === item.label">
              <li v-for="sub in item.subItems" :key="sub.to">
                <NuxtLink
                  :to="sub.to"
                  @click="toggleDropdownMenu(sub.label)"
                  :target="sub.to.endsWith('.pdf') ? '_blank' : '_self'"
                  class="block p-4 border-b pl-10 border-slate-500 bg-gray-600 hover:bg-gray-700 hover:underline"
                >
                  {{ sub.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <!-- NavBar Desktop -->
    <nav class="bg-greenLight hidden lg:block">
      <div
        class="max-w-8xl mx-auto px-4 flex items-center justify-center text-sm font-semibold font-benton text-brown"
      >
        <ul class="flex">
          <li
            v-for="item in navItems"
            :key="item.to"
            class="relative p-5"
            :class="[
              item.subItems && openDropdownLabel === item.label
                ? 'bg-secondary'
                : '',
              ,
            ]"
          >
            <!-- Link -->
            <NuxtLink
              v-if="!item.subItems"
              :to="item.to"
              @click="toggleDropdownMenu(item.label)"
              class="pb-2 border-b-2 hover:border-primary"
              :class="[
                isActive(item.to) ? 'border-primary' : 'border-transparent',
              ]"
            >
              {{ item.label }}
            </NuxtLink>

            <!-- Botão de dropdown -->
            <button
              v-else
              @click="toggleDropdownMenu(item.label)"
              class="pb-2 border-b-2 border-transparent hover:border-primary"
              :class="[
                openDropdownLabel === item.label
                  ? 'text-white hover:border-transparent'
                  : '',
              ]"
            >
              {{ item.label }}
            </button>

            <!-- Menu Dropdown -->
            <ul
              v-if="item.subItems && openDropdownLabel === item.label"
              class="absolute z-50 left-0 mt-5 bg-secondary w-56 px-2 py-4 space-y-1"
            >
              <li v-for="sub in item.subItems" :key="sub.to">
                <NuxtLink
                  :to="sub.to"
                  @click="toggleDropdownMenu(sub.label)"
                  :target="sub.to.endsWith('.pdf') ? '_blank' : '_self'"
                  class="block px-4 py-2 text-white hover:underline"
                >
                  {{ sub.label }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/');
};

const openDropdownLabel = ref<string | null>(null);
const toggleDropdownMenu = (label: string) => {
  openDropdownLabel.value = openDropdownLabel.value === label ? null : label;
};

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const navItems = [
  { to: '/membership', label: 'ADESÃO' },
  {
    label: 'SOBRE',
    subItems: [
      { to: '/about', label: 'OMVA' },
      { to: '/about/history', label: 'História' },
      { to: '/docs/estatutos-omva-2003.pdf', label: 'Estatutos' },
      { to: '/about/governing-body', label: 'Corpo Directivo' },
    ],
  },
  { to: '/contact', label: 'CONTACTO' },
];
</script>
