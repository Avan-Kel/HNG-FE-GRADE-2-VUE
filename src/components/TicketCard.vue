<template>
  <div class="p-4 bg-white rounded-lg shadow flex flex-col justify-between">
    <div>
      <h3 class="font-semibold">{{ ticket.title }}</h3>
      <div class="text-sm text-slate-500">
        {{ new Date(ticket.createdAt).toLocaleString() }}
      </div>
    </div>
    <p class="mt-2 text-slate-700">{{ ticket.description }}</p>
    <div class="mt-4 flex items-center justify-between">
      <div :class="statusClass" class="px-2 py-1 rounded text-xs font-medium">
        {{ statusLabel }}
      </div>
      <div class="flex gap-2">
        <button @click="$emit('edit', ticket)" class="px-2 py-1 border rounded">
          Edit
        </button>
        <button
          @click="$emit('delete', ticket.id)"
          class="px-2 py-1 border rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from "../types";
import { computed } from "vue";
const props = defineProps<{ ticket: Ticket }>();

const statusClass = computed(() => {
  return props.ticket.status === "open"
    ? "bg-green-100 text-green-800"
    : props.ticket.status === "in_progress"
    ? "bg-amber-100 text-amber-800"
    : "bg-slate-100 text-slate-800";
});

const statusLabel = computed(() => props.ticket.status.replace("_", " "));
</script>
