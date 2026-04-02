import { create } from "zustand";

const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (message, type = "info", duration = 3000) => {
    const id = crypto.randomUUID();
    const newToast = { id, message, type };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default useToastStore;
