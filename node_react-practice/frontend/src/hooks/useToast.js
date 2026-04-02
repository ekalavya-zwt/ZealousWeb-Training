import useToastStore from "../stores/toastStore";

const useToast = () => {
  const toasts = useToastStore((s) => s.toasts);
  const addToast = useToastStore((s) => s.addToast);
  const removeToast = useToastStore((s) => s.removeToast);

  return { toasts, addToast, removeToast };
};

export default useToast;
