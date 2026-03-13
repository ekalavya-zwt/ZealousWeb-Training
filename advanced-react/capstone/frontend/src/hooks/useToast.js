import useToastStore from "../stores/toastStore";

const useToast = () => {
  const toasts = useToastStore((state) => state.toasts);
  const addToast = useToastStore((state) => state.addToast);
  const removeToast = useToastStore((state) => state.removeToast);

  return { toasts, addToast, removeToast };
};

export default useToast;
