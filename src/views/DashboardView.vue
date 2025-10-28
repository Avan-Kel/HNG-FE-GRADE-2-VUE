<template>
  <div class="mt-8 max-w-[1440px]">
    <h2 class="text-2xl font-bold">Dashboard</h2>
    <div class="grid md:grid-cols-4 gap-4 mt-6">
      <div class="p-4 bg-white rounded-lg shadow">
        <div class="text-sm font-medium text-slate-700">Total</div>
        <div class="text-2xl font-bold">{{ total }}</div>
      </div>
      <div class="p-4 bg-white rounded-lg shadow">
        <div class="text-sm font-medium text-green-600">Open</div>
        <div class="text-2xl font-bold">{{ open }}</div>
      </div>
      <div class="p-4 bg-white rounded-lg shadow">
        <div class="text-sm font-medium text-amber-600">In Progress</div>
        <div class="text-2xl font-bold">{{ inProgress }}</div>
      </div>
      <div class="p-4 bg-white rounded-lg shadow">
        <div class="text-sm font-medium text-slate-700">Closed</div>
        <div class="text-2xl font-bold">{{ closed }}</div>
      </div>
    </div>
    <div class="mt-6">
      <router-link class="px-3 py-2 rounded border" to="/tickets"
        >Go to Ticket Management</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTickets } from "../composables/useTickets";

const { tickets } = useTickets();

const total = computed(() => tickets.value.length);
const open = computed(
  () => tickets.value.filter((t) => t.status === "open").length
);
const inProgress = computed(
  () => tickets.value.filter((t) => t.status === "in_progress").length
);
const closed = computed(
  () => tickets.value.filter((t) => t.status === "closed").length
);
</script>
