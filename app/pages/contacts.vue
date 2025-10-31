<script setup lang="ts">
import { ContactServiceHandler } from '~~/server/contact-service/contact_service_handler';

useSeoMeta({
  title: 'Contacte-nos',
  description: 'Entre em contacto connosco para mais informações ou questões.',
});

const service = new ContactServiceHandler();

interface FormData {
  name: string;
  email: string;
  message: string;
}

const formData = ref<FormData>({
  name: '',
  email: '',
  message: '',
});

const isFormValid = computed(() => {
  const { name, email, message } = formData.value;

  const nameValid = name.trim().length >= 3;
  const emailValid = email.trim().length > 0;
  const messageValid = message.trim().length >= 10;

  return nameValid && emailValid && messageValid;
});

const handleSubmit = async () => {
  const { name, email, message } = formData.value;

  try {
    const res = await service.sendMail(name, email, message);

    formData.value = { name: '', email: '', message: '' };

    alert(res.message);
  } catch (error: any) {
    const message =
      error?.status === 500
        ? 'Não foi possível enviar as informações. Tente mais tarde'
        : error?.statusMessage;
    alert(message);
  }
};
</script>

<template>
  <div class="max-w-8xl mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <TheH1>Contacte-nos</TheH1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 group">
      <form
        novalidate
        @submit.prevent="handleSubmit"
        class="md:col-span-2 space-y-5 group"
      >
        <div class="grid">
          <label
            for="name"
            class="text-brown font-benton font-medium text-sm lg:text-base"
            >NOME <span class="text-red-600 text-base">*</span></label
          >
          <input
            id="name"
            type="text"
            v-model="formData.name"
            minlength="3"
            required
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
            required
            v-model="formData.email"
            class="py-3 px-4 text-sm lg:text-base border-2 mt-2 outline-secondary text-gray-600"
          />
        </div>
        <div class="grid">
          <label
            for="message"
            class="text-brown font-benton font-medium text-sm lg:text-base"
            >QUAL A SUA QUESTÃO/COMENTÁRIO
            <span class="text-red-600 text-base">*</span></label
          >
          <textarea
            required
            minlength="10"
            v-model="formData.message"
            class="peer py-3 px-4 h-40 text-sm lg:text-base border-2 mt-2 outline-secondary text-gray-600"
            maxlength="250"
          ></textarea>
        </div>
        <TheButton
          type="submit"
          :disabled="!isFormValid"
          class="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-none disabled:hover:text-brown"
          >Submeter</TheButton
        >
      </form>
      <div class="md:col-span-1">
        <div class="bg-light px-6 py-8 pt-16">
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
                to="mailto:secretariado@omvangola.co.ao"
                class="hover:underline"
                >secretariado@omvangola.co.ao</NuxtLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
