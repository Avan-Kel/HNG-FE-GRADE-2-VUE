<template>
  <div class="max-w-[1440px] mx-auto mt-12 ">
    <h2 class="text-2xl font-bold">Login</h2>
    <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
      <div>
        <label class="block">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full border p-2 rounded"
          :aria-invalid="!!errors.email"
        />
        <div v-if="errors.email" class="text-red-600 text-sm mt-1">
          {{ errors.email }}
        </div>
      </div>
      <div>
        <label class="block">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full border p-2 rounded"
          :aria-invalid="!!errors.password"
        />
        <div v-if="errors.password" class="text-red-600 text-sm mt-1">
          {{ errors.password }}
        </div>
      </div>
      <div>
        <button class="px-4 py-2 rounded bg-blue-600 text-white">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../composables/useAuth";
import { useToast } from "../composables/useToast";

const email = ref("");
const password = ref("");
const errors = ref<{ email?: string; password?: string }>({});
const router = useRouter();
const { push } = useToast();

function handleSubmit() {
  errors.value = {};
  if (!email.value) errors.value.email = "Email is required";
  if (!password.value) errors.value.password = "Password is required";
  if (Object.keys(errors.value).length) return;
  try {
    login({ email: email.value, password: password.value });
    push({ message: "Logged in", type: "success" });
    router.push("/dashboard");
  } catch (err: any) {
    push({ message: err.message || "Login failed", type: "error" });
  }
}
</script>
