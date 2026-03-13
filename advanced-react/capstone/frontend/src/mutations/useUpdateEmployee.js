import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../api/employeeApi";
import { employeeKeys } from "../queries/employeeKeys";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateEmployee({ id, data }),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: employeeKeys.all });

      const previousEmployees = queryClient.getQueryData(employeeKeys.all);

      queryClient.setQueryData(employeeKeys.all, (old) =>
        old?.map((emp) => (emp.id === Number(id) ? { ...emp, ...data } : emp)),
      );

      return { previousEmployees };
    },

    onError: (_, __, context) => {
      queryClient.setQueriesData(employeeKeys.all, context.previousEmployees);
    },

    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      queryClient.invalidateQueries({
        queryKey: employeeKeys.detail(variables.id),
      });
    },
  });
};
