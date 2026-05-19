<script setup>
import { LrDiscovery } from '@zafir.co.ao/lightray';

const { antboxTenant, antboxUrl } = useAntboxService();

definePageMeta({ layout: 'lightray' });

useSeoMeta({
  title: 'Área Administractiva - Antbox CMS',
});
</script>

<template>
  <ClientOnly>
    <LrDiscovery :antbox-url="antboxUrl" :tenant="antboxTenant" />
  </ClientOnly>
</template>
