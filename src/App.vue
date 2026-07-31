<script setup lang="ts">
import { computed } from "vue";
import { provideTheme } from "./composables/useTheme";

const { darkMode } = provideTheme();
const theme = computed(() => (darkMode.value ? "dark" : "light"));
</script>

<template>
  <div :class="['app-shell', theme]">
    <RouterView />
  </div>
</template>
