<script setup lang="ts">
const props = defineProps<{
  images: string[];
  currentImage: string;
}>();

const emit = defineEmits<{
  (e: 'select', image: string): void;
}>();

const scrollContainer = ref<HTMLElement | null>(null);

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' });
  }
};
</script>

<template>
  <div v-if="images && images.length > 0" class="mt-4 relative group">
    <!-- Botão Esquerdo -->
    <button
      @click="scrollLeft"
      class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4"
      aria-label="Scroll left"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>

    <div
      ref="scrollContainer"
      class="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="flex-shrink-0 cursor-pointer border-2 transition-all duration-300"
        :class="[
          image === currentImage
            ? 'border-primary'
            : 'border-transparent hover:border-primary/50',
        ]"
        @click="emit('select', image)"
      >
        <NuxtImg
          :src="image"
          alt="Event gallery image"
          class="h-32 md:h-36 w-52 md:w-56 object-cover"
          placeholder
        />
      </div>
    </div>

    <!-- Botão Direito -->
    <button
      @click="scrollRight"
      class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-4"
      aria-label="Scroll right"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
