<script setup lang="ts">
import type { NavItem } from '~/model/types/navItem';
import { navItems, otherItems } from '~/model/data/navItems';

const props = defineProps<{
  route: any;
}>();

const normalizeLabel = (segment: string) => {
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c);
};

const findLabel = (items: NavItem[], path: string): string => {
  for (const item of items) {
    if (item.to === path) return item.label;

    for (const other of otherItems) {
      if (other.to === path) return other.label;
    }

    if (item.subItems) {
      const found = findLabel(item.subItems, path);
      if (found) return found.toUpperCase();
    }
  }
  return '';
};

const breadcrumb = computed(() => {
  const segments = props.route.path.split('/').filter(Boolean);
  const breadcrumbs = [{ to: '/', label: 'HOME' }];
  let currentPath = '';

  for (let i = 0; i < segments.length; i++) {
    currentPath += '/' + segments[i];

    const label =
      findLabel(navItems, currentPath) ||
      normalizeLabel(segments[i]!).toUpperCase();

    breadcrumbs.push({ to: currentPath, label });
  }

  return breadcrumbs;
});
</script>

<template>
  <nav
    class="max-w-8xl mx-auto px-4 py-2 text-[12px] font-benton"
    v-if="route.path !== '/'"
  >
    <ul class="flex space-x-2">
      <li
        v-for="(crumb, index) in breadcrumb"
        :key="crumb.to"
        class="flex items-center"
      >
        <template v-if="index < breadcrumb.length - 1">
          <NuxtLink :to="crumb.to" class="hover:text-primary">{{
            crumb.label
          }}</NuxtLink>
          <span class="ml-2 text-brown"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </template>
        <template v-else>
          <span class="font-medium text-primary">{{ crumb.label }}</span>
        </template>
      </li>
    </ul>
  </nav>
</template>
