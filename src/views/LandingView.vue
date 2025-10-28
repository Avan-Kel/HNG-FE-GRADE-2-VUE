<template>
  <div>
    <Hero />
    <section class="container-centered mt-8 grid md:grid-cols-3 gap-6 max-w-[1440px]">
      <div class="p-6 bg-white rounded-lg shadow">Responsive & Accessible Design</div>
      <div class="p-6 bg-white rounded-lg shadow">Inline Validation & Error Feedback</div>
      <div class="p-6 bg-white rounded-lg shadow">Manage Tickets Anywhere</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Hero from "../components/Hero.vue";
</script>
