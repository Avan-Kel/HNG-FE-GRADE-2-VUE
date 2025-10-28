import { ref } from "vue";

export type Toast = { id: string; message: string; type?: "success" | "error" };
const toasts = ref<Toast[]>([]);

export function useToast() {
  function push(t: Omit<Toast, "id">) {
    const id = String(Date.now());
    toasts.value.push({ ...t, id });
    setTimeout(() => {
      toasts.value = toasts.value.filter((x) => x.id !== id);
    }, 4000);
  }
  return { toasts, push };
}
