<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTickets } from "@/composables/useTickets";

const { tickets, createTicket, updateTicket, deleteTicket } = useTickets();

const showModal = ref(false);
const editingTicket = ref<string | null>(null);

const form = ref({
  title: "",
  description: "",
  priority: "low",
  status: "open",
});

function openModal(ticketId?: string) {
  if (ticketId) {
    const t = tickets.value.find((t) => t.id === ticketId);
    if (!t) return;
    editingTicket.value = t.id;
    form.value = { ...t };
  } else {
    editingTicket.value = null;
    form.value = {
      title: "",
      description: "",
      priority: "low",
      status: "open",
    };
  }
  showModal.value = true;
}

function handleSubmit() {
  if (!form.value.title.trim() || !form.value.description.trim()) {
    alert("Title & description required.");
    return;
  }

  if (editingTicket.value) {
    updateTicket(editingTicket.value, form.value);
  } else {
    createTicket({
      title: form.value.title,
      description: form.value.description,
      priority: form.value.priority as "low" | "medium" | "high",
      status: form.value.status as any,
    });
  }
  showModal.value = false;
}
</script>

<template>
  <div class="space-y-6">
    <!-- HEADER -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">🎟 Ticket Manager</h1>
      <Button @click="openModal()">+ Add Ticket</Button>
    </div>

    <!-- TICKETS LIST -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="ticket in tickets" :key="ticket.id" class="shadow-lg">
        <CardHeader>
          <CardTitle>{{ ticket.title }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <p class="text-gray-600">{{ ticket.description }}</p>
          <p>
            <span class="font-semibold">Priority:</span>
            <span
              :class="{
                'text-red-600': ticket.priority === 'high',
                'text-yellow-500': ticket.priority === 'medium',
                'text-green-600': ticket.priority === 'low',
              }"
            >
              {{ ticket.priority }}
            </span>
          </p>
          <p>
            <span class="font-semibold">Status:</span> {{ ticket.status }}
          </p>
          <div class="flex gap-2 mt-3">
            <Button variant="outline" size="sm" @click="openModal(ticket.id)">
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              @click="deleteTicket(ticket.id)"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- DIALOG -->
    <Dialog v-model:open="showModal">
      <transition name="fade">
        <DialogContent class="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {{ editingTicket ? "Edit Ticket" : "Add Ticket" }}
            </DialogTitle>
          </DialogHeader>

          <div class="space-y-3">
            <Input v-model="form.title" placeholder="Title" />
            <Textarea v-model="form.description" placeholder="Description" />
            <div class="flex gap-3">
              <select v-model="form.priority" class="border rounded-md p-2 w-1/2">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select v-model="form.status" class="border rounded-md p-2 w-1/2">
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <Button class="w-full mt-4" @click="handleSubmit">
              {{ editingTicket ? "Save Changes" : "Create Ticket" }}
            </Button>
          </div>
        </DialogContent>
      </transition>
    </Dialog>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
