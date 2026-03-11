import { useEffect } from "react";
import { useWebSocket } from "./useWebSocket";
import { useEmployeeStore } from "../store/useEmployeeStore";
import toast from "react-hot-toast";

export function useEmployeeSocket() {
  const { data, status } = useWebSocket("ws://localhost:3001");

  const addEmployee = useEmployeeStore((s) => s.addEmployee);
  const setEmployees = useEmployeeStore((s) => s.setEmployees);
  const updateSalary = useEmployeeStore((s) => s.updateSalary);
  const deleteEmployee = useEmployeeStore((s) => s.deleteEmployee);

  console.log("WS Event:", data);

  useEffect(() => {
    if (!data) return;

    switch (data.type) {
      case "employees_initial":
        setEmployees(data.payload);
        break;

      case "employee_created":
        addEmployee(data.payload);
        toast.success("Employee created");
        break;

      case "salary_updated":
        updateSalary(data.payload.id, data.payload.salary);
        toast("Salary updated");
        break;

      case "employee_deleted":
        deleteEmployee(data.payload.id);
        toast.error("Employee removed");
        break;
    }
  }, [data]);

  return { status };
}
