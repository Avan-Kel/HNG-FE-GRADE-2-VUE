<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
  >
    <div class="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 relative">
      <h2 class="text-lg font-semibold mb-4 text-gray-800">{{ title }}</h2>
      <div class="mb-4"><slot /></div>
      <div class="flex justify-end space-x-3 mt-4">
        <button @click="onClose" class="px-4 py-2 rounded-lg border">
          {{ cancelText }}
        </button>
        <button
          v-if="showConfirm"
          @click="onConfirm"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: { type: String, default: "" },
  isOpen: { type: Boolean, default: false },
  confirmText: { type: String, default: "Confirm" },
  cancelText: { type: String, default: "Cancel" },
  showConfirm: { type: Boolean, default: true },
});

const emit = defineEmits(["close", "confirm"]);

function onClose() {
  emit("close");
}
function onConfirm() {
  emit("confirm");
}
</script>
