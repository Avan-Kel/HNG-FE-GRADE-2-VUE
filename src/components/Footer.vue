<template>
  <footer class="bg-slate-50 mt-8">
    <div class=" py-6 text-sm text-slate-600">
      © {{ year }} TicketApp — Built for Frontend Stage 2 challenge.
      Accessibility-ready.
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
