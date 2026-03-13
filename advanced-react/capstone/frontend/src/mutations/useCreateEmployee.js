import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../api/employeeApi";
import { employeeKeys } from "../queries/employeeKeys";
import useToast from "../hooks/useToast";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      addToast("Employee created successfully", "success");
    },
  });
};
