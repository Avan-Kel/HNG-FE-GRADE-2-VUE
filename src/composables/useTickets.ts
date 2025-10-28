import { ref, watch } from "vue";
import type { Ticket, TicketStatus } from "../types";

const TICKETS_KEY = "ticketapp_tickets";

function allowedStatus(s: string): s is TicketStatus {
  return ["open", "in_progress", "resolved", "closed"].includes(s);
}

// ---- Load and validate stored tickets ----
const stored = localStorage.getItem(TICKETS_KEY);
let initialTickets: Ticket[] = [];

if (stored) {
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      initialTickets = parsed.filter(
        (t: any): t is Ticket =>
          typeof t.id === "string" &&
          typeof t.title === "string" &&
          typeof t.status === "string" &&
          typeof t.createdAt === "string"
      ) as Ticket[];
    }
  } catch (err) {
    console.warn("Invalid localStorage data, resetting tickets:", err);
  }
}

const tickets = ref<Ticket[]>(initialTickets);

// ---- Persist tickets to localStorage ----
watch(
  tickets,
  (v) => {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(v));
  },
  { deep: true }
);

// ---- CRUD Logic ----
export function useTickets() {
  function loadTickets() {
    return tickets.value;
  }

  function createTicket(data: Omit<Ticket, "id" | "createdAt">) {
    if (!data.title) throw new Error("Title required");
    if (!allowedStatus(data.status)) throw new Error("Invalid status");

    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      title: data.title,
      description: data.description || "",
      priority: data.priority || "low",
      status: data.status,
    };

    tickets.value.unshift(newTicket);
    return newTicket;
  }

  function updateTicket(id: string, updates: Partial<Ticket>) {
    const idx = tickets.value.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Ticket not found");

    if (updates.status && !allowedStatus(updates.status)) {
      throw new Error("Invalid status");
    }

    tickets.value[idx] = { ...tickets.value[idx], ...updates } as Ticket;
  }

  function deleteTicket(id: string) {
    tickets.value = tickets.value.filter((t) => t.id !== id);
  }

  return { tickets, loadTickets, createTicket, updateTicket, deleteTicket };
}
