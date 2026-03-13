import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeByID } from "../api/employeeApi";
import { employeeKeys } from "./employeeKeys";

export const useEmployee = (id) => {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => fetchEmployeeByID(id),
    enabled: !!id,
  });
};
