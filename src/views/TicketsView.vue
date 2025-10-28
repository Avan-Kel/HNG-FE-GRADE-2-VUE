<template>
  <div class="mt-8">
    <h2 class="text-2xl font-bold">Tickets</h2>

    <form @submit.prevent="onSubmit" class="mt-4 grid md:grid-cols-3 gap-4">
      <div>
        <label class="block">Title *</label>
        <input v-model="title" class="w-full border p-2 rounded" />
        <div v-if="errors.title" class="text-red-600 text-sm mt-1">
          {{ errors.title }}
        </div>
      </div>

      <div>
        <label>Status *</label>
        <select v-model="status" class="w-full border p-2 rounded">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <div v-if="errors.status" class="text-red-600 text-sm mt-1">
          {{ errors.status }}
        </div>
      </div>

      <div class="flex items-end">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
          {{ editingId ? "Update" : "Create" }}
        </button>
      </div>

      <div class="md:col-span-3">
        <label>Description</label>
        <textarea v-model="desc" class="w-full border p-2 rounded" />
      </div>
    </form>

    <div class="mt-6 grid md:grid-cols-3 gap-4">
      <div v-if="tickets.length === 0" class="text-slate-500">
        No tickets yet
      </div>
      <TicketCard
        v-for="t in tickets"
        :key="t.id"
        :ticket="t"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <Modal
      :isOpen="confirmOpen"
      @close="confirmOpen = false"
      @confirm="confirmDelete"
    >
      <p>Are you sure you want to delete this ticket?</p>
    </Modal>

    <Toasts />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TicketCard from "../components/TicketCard.vue";
import Modal from "../components/Modal.vue";
import Toasts from "../components/Toasts.vue";
import { useTickets } from "../composables/useTickets";
import { useToast } from "../composables/useToast";

const { tickets, createTicket, updateTicket, deleteTicket } = useTickets();
const { push } = useToast();

const title = ref("");
const status = ref<"open" | "in_progress" | "closed">("open");
const desc = ref("");
const editingId = ref<string | null>(null);
const errors = ref<any>({});
const confirmOpen = ref(false);
let pendingDeleteId: string | null = null;

function validate() {
  errors.value = {};
  if (!title.value) errors.value.title = "Title is required";
  if (!["open", "in_progress", "closed"].includes(status.value))
    errors.value.status = "Invalid status";
  return Object.keys(errors.value).length === 0;
}

function onSubmit() {
  if (!validate()) return;
  try {
    if (editingId.value) {
      updateTicket(editingId.value, {
        title: title.value,
        description: desc.value,
        status: status.value,
      });
      push({ message: "Ticket updated", type: "success" });
      editingId.value = null;
    } else {
      createTicket({
        title: title.value,
        description: desc.value,
        status: status.value,
      });
      push({ message: "Ticket created", type: "success" });
    }
    title.value = "";
    desc.value = "";
    status.value = "open";
  } catch (err: any) {
    push({ message: err.message || "Operation failed", type: "error" });
  }
}

function handleEdit(ticket: any) {
  desc.value = ticket.description || "";
  status.value = ticket.status;
}

function handleDelete(id: string) {
  pendingDeleteId = id;
  confirmOpen.value = true;
}

function confirmDelete() {
  if (!pendingDeleteId) return;
  try {
    deleteTicket(pendingDeleteId);
    push({ message: "Ticket deleted", type: "success" });
  } catch (err: any) {
    push({ message: err.message || "Delete failed", type: "error" });
  }
  confirmOpen.value = false;
  pendingDeleteId = null;
}
</script>
