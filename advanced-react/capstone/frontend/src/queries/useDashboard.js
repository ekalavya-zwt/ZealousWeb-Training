import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "../api/employeeApi";
import { employeeKeys } from "./employeeKeys";

export const useDashboard = () => {
  return useQuery({
    queryKey: employeeKeys.stats,
    queryFn: fetchStats,
  });
};
