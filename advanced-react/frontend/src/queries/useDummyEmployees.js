import { useQuery } from "@tanstack/react-query";
import { fetchDummyEmployees } from "../api/employeeApi";
import { employeeKeys } from "./employeeKeys";

export const useDummyEmployees = () => {
  return useQuery({
    queryKey: employeeKeys.allDummy,
    queryFn: fetchDummyEmployees,
  });
};
