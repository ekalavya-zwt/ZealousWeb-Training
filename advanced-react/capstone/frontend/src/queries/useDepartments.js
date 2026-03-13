import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "../api/employeeApi";
import { employeeKeys } from "./employeeKeys";

export const useDepartments = () => {
  return useQuery({
    queryKey: employeeKeys.departments,
    queryFn: fetchDepartments,
  });
};
