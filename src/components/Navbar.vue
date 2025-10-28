<template>
  <header class="bg-white shadow-sm">
    <div class="container-centered flex items-center justify-between py-4">
      <router-link to="/" class="font-bold text-xl">HNG TicketApp</router-link>
      <nav>
        <ul class="flex items-center gap-4">
          <li><router-link to="/">Home</router-link></li>
          <li v-if="session"><router-link to="/dashboard">Dashboard</router-link></li>
          <li v-if="session"><router-link to="/tickets">Tickets</router-link></li>
          <li v-if="!session"><router-link to="/auth/login">Login</router-link></li>
          <li v-if="!session"><router-link to="/auth/signup">Get Started</router-link></li>
          <li v-if="session"><button @click="logout" class="btn">Logout</button></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getSession, clearSession } from "../composables/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const session = ref<any | null>(null);

onMounted(() => {
  session.value = getSession();
});

function logout() {
  clearSession();
  session.value = null;
  router.push("/");
}
</script>
