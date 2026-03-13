import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../api/employeeApi";
import { employeeKeys } from "../queries/employeeKeys";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteEmployee(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: employeeKeys.all });

      const previousEmployees = queryClient.getQueryData(employeeKeys.all);

      queryClient.setQueryData(employeeKeys.all, (old) =>
        old?.filter((emp) => emp.id !== Number(id)),
      );

      return { previousEmployees };
    },

    onError: (_, __, context) => {
      queryClient.setQueriesData(employeeKeys.all, context.previousEmployees);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
    },
  });
};
