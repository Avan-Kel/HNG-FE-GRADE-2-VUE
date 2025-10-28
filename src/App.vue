<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />
    <main class="flex-1 container-centered w-full py-6">
      <router-view />
    </main>
    <Footer />
    <!-- Global toasts -->
    <Toasts />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Toasts from "./components/Toasts.vue";
</script>

<style>
/* small safeguard so body background matches container look in designs */
body {
  background-color: #f8fafc;
}
</style>
