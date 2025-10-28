<template>
  <div class="fixed right-4 top-4 z-50 flex flex-col gap-2">
    <div
      v-for="t in toasts"
      :key="t.id"
      :class="[
        'px-4 py-2 rounded',
        t.type === 'error'
          ? 'bg-red-100 text-red-800'
          : 'bg-green-100 text-green-800',
      ]"
    >
      {{ t.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "../composables/useToast";
const { toasts } = useToast();
</script>
