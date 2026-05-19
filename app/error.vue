<script setup lang="ts">
interface NuxtError {
  status: number;
  fatal: boolean;
  unhandled: boolean;
  statusText?: string;
  data?: unknown;
  cause?: unknown;
  statusCode: number;
  statusMessage?: string;
}

const props = defineProps<{
  error: NuxtError;
}>();

const errorTitle = computed(() => {
  if (props.error.statusCode === 404 || props.error.status === 404) {
    return 'Página não encontrada';
  }
  return 'Ocorreu um erro inesperado';
});

const errorMessage = computed(() => {
  if (props.error.statusCode === 404 || props.error.status === 404) {
    return 'A página que procura não existe ou foi movida.';
  }
  return (
    props.error.statusMessage ||
    'Pedimos desculpa pelo incómodo. Estamos a trabalhar para resolver o problema.'
  );
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <NuxtLayout name="default">
    <div
      class="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 md:py-24 text-center"
    >
      <div class="space-y-6 max-w-2xl mx-auto">
        <h1
          class="text-7xl md:text-9xl font-benton font-bold text-primary opacity-20"
        >
          {{ error.statusCode }}
        </h1>

        <div class="relative -mt-12 md:-mt-20">
          <TheH1>
            {{ errorTitle }}
          </TheH1>

          <TheParagraph>
            <p class="text-gray-600 mb-8">
              {{ errorMessage }}
            </p>
          </TheParagraph>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <TheButton @click="handleError" class-name="min-w-[200px]">
              Voltar ao Início
            </TheButton>

            <TheButton
              @click="$router.back()"
              class-name="min-w-[200px] bg-secondary text-white border-secondary hover:from-secondary hover:to-secondary/80"
            >
              Página Anterior
            </TheButton>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
