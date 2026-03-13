import { useMutation } from "@tanstack/react-query";
import { loginEmployee } from "../api/employeeApi";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";

export const useLoginEmployee = () => {
  const { login } = useAuth();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: loginEmployee,

    onSuccess: (data) => {
      login(data.employee, data.token);
      addToast("Login successful", "success");
    },
  });
};
