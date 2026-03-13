import { useQuery } from "@tanstack/react-query";
import { fetchSalaryReport } from "../api/employeeApi";
import { employeeKeys } from "./employeeKeys";

export const useSalaryReport = () => {
  return useQuery({
    queryKey: employeeKeys.all,
    queryFn: fetchSalaryReport,
  });
};
