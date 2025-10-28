<template>
  <div class="max-w-md mx-auto mt-12">
    <h2 class="text-2xl font-bold">Create account</h2>
    <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
      <div>
        <label>Email</label>
        <input v-model="email" class="w-full border p-2 rounded" />
        <div v-if="errors.email" class="text-red-600 text-sm mt-1">
          {{ errors.email }}
        </div>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          class="w-full border p-2 rounded"
        />
        <div v-if="errors.password" class="text-red-600 text-sm mt-1">
          {{ errors.password }}
        </div>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          v-model="confirm"
          class="w-full border p-2 rounded"
        />
        <div v-if="errors.confirm" class="text-red-600 text-sm mt-1">
          {{ errors.confirm }}
        </div>
      </div>
      <div>
        <button class="px-4 py-2 rounded bg-blue-600 text-white">Create</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signup } from "../composables/useAuth";
import { useToast } from "../composables/useToast";

const email = ref("");
const password = ref("");
const confirm = ref("");
const errors = ref<any>({});
const router = useRouter();
const { push } = useToast();

function handleSubmit() {
  errors.value = {};
  if (!email.value) errors.value.email = "Email required";
  if (!password.value || password.value.length < 8)
    errors.value.password = "Password required (min 8)";
  if (password.value !== confirm.value)
    errors.value.confirm = "Passwords do not match";
  if (Object.keys(errors.value).length) return;
  try {
    signup({ email: email.value, password: password.value });
    push({ message: "Account created", type: "success" });
    router.push("/dashboard");
  } catch (err: any) {
    push({ message: err.message || "Signup failed", type: "error" });
  }
}
</script>
